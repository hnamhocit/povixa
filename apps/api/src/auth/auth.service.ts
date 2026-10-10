import {
  Injectable,
  UnauthorizedException,
  Inject,
  Logger,
} from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { DRIZZLE, type DrizzleDB } from '../database/database.service.js';
import { users, type User } from '../database/schema/users.js';
import { endUsers, type EndUser } from '../database/schema/end-users.js';
import {
  appUserOAuthAccounts,
  endUserOAuthAccounts,
} from '../database/schema/oauth.js';
import { refreshTokens } from '../database/schema/sessions.js';
import { OAuthService, type OAuthProvider } from './oauth.service.js';
import { TokenService, type TokenPayload } from './token.service.js';
import { RedisService } from '../redis/redis.service.js';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
    private readonly oauthService: OAuthService,
    private readonly tokenService: TokenService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * App Users OAuth login / register callback handler
   */
  async handleAppUserOAuth(
    provider: OAuthProvider,
    code: string,
    codeVerifier?: string,
    reqMeta?: { userAgent?: string; ipAddress?: string },
  ) {
    const profile = await this.oauthService.validateAppUserCode(
      provider,
      code,
      codeVerifier,
    );

    // 1. Check if OAuth account already exists
    const existingAccounts = await this.db
      .select()
      .from(appUserOAuthAccounts)
      .where(
        and(
          eq(appUserOAuthAccounts.provider, provider),
          eq(appUserOAuthAccounts.providerUserId, profile.providerUserId),
        ),
      )
      .limit(1);

    let user: User;

    if (existingAccounts.length > 0) {
      const account = existingAccounts[0];
      const foundUsers = await this.db
        .select()
        .from(users)
        .where(eq(users.id, account.userId))
        .limit(1);

      if (!foundUsers.length) {
        throw new UnauthorizedException('Associated user account not found');
      }
      user = foundUsers[0];

      // Update tokens in background
      await this.db
        .update(appUserOAuthAccounts)
        .set({
          accessToken: profile.accessToken,
          profileData: profile.raw,
          updatedAt: new Date(),
        })
        .where(eq(appUserOAuthAccounts.id, account.id));
    } else {
      // 2. Look up user by email or create new user
      if (profile.email) {
        const found = await this.db
          .select()
          .from(users)
          .where(eq(users.email, profile.email))
          .limit(1);

        if (found.length > 0) {
          user = found[0];
        } else {
          const [newUser] = await this.db
            .insert(users)
            .values({
              email: profile.email,
              name: profile.name,
              avatarUrl: profile.avatarUrl,
              emailVerified: true,
              role: 'developer',
            })
            .returning();
          user = newUser;
        }
      } else {
        // Fallback user without email
        const generatedEmail = `${provider}_${profile.providerUserId}@povixa.oauth`;
        const [newUser] = await this.db
          .insert(users)
          .values({
            email: generatedEmail,
            name: profile.name || `${provider} User`,
            avatarUrl: profile.avatarUrl,
            role: 'developer',
          })
          .returning();
        user = newUser;
      }

      // Link OAuth account to user
      await this.db.insert(appUserOAuthAccounts).values({
        userId: user.id,
        provider,
        providerUserId: profile.providerUserId,
        email: profile.email,
        accessToken: profile.accessToken,
        profileData: profile.raw,
      });
    }

    // 3. Cache user session in RAM (Redis)
    const sessionData = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      role: user.role,
      userType: 'app_user',
    };
    await this.redisService.setUserSession(user.id, sessionData, 15 * 60);

    // 4. Generate JWT Access Token & Refresh Token
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      userType: 'app_user',
    };
    const tokens = await this.tokenService.generateTokens(payload);

    // 5. Store Refresh Token Hash in DB & Redis RAM
    const tokenHash = this.tokenService.hashToken(tokens.refreshToken);
    await this.db.insert(refreshTokens).values({
      userType: 'app_user',
      userId: user.id,
      tokenHash,
      userAgent: reqMeta?.userAgent,
      ipAddress: reqMeta?.ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.redisService.setRefreshTokenState(tokenHash, {
      userId: user.id,
      userType: 'app_user',
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: sessionData,
    };
  }

  /**
   * Project End Users OAuth login / register callback handler
   */
  async handleEndUserOAuth(
    projectId: string,
    provider: OAuthProvider,
    code: string,
    codeVerifier?: string,
    reqMeta?: { userAgent?: string; ipAddress?: string },
  ) {
    const profile = await this.oauthService.validateEndUserCode(
      projectId,
      provider,
      code,
      codeVerifier,
    );

    // 1. Check if End User OAuth account exists
    const existingAccounts = await this.db
      .select()
      .from(endUserOAuthAccounts)
      .where(
        and(
          eq(endUserOAuthAccounts.projectId, projectId),
          eq(endUserOAuthAccounts.provider, provider),
          eq(endUserOAuthAccounts.providerUserId, profile.providerUserId),
        ),
      )
      .limit(1);

    let endUser: EndUser;

    if (existingAccounts.length > 0) {
      const account = existingAccounts[0];
      const found = await this.db
        .select()
        .from(endUsers)
        .where(eq(endUsers.id, account.endUserId))
        .limit(1);

      if (!found.length) {
        throw new UnauthorizedException('Associated end user account not found');
      }
      endUser = found[0];

      await this.db
        .update(endUserOAuthAccounts)
        .set({
          accessToken: profile.accessToken,
          profileData: profile.raw,
          updatedAt: new Date(),
        })
        .where(eq(endUserOAuthAccounts.id, account.id));
    } else {
      // 2. Find or create End User in project
      const email =
        profile.email || `${provider}_${profile.providerUserId}@${projectId}.app`;

      const found = await this.db
        .select()
        .from(endUsers)
        .where(and(eq(endUsers.projectId, projectId), eq(endUsers.email, email)))
        .limit(1);

      if (found.length > 0) {
        endUser = found[0];
      } else {
        const [newEndUser] = await this.db
          .insert(endUsers)
          .values({
            projectId,
            email,
            name: profile.name,
            avatarUrl: profile.avatarUrl,
            emailVerified: true,
          })
          .returning();
        endUser = newEndUser;
      }

      await this.db.insert(endUserOAuthAccounts).values({
        projectId,
        endUserId: endUser.id,
        provider,
        providerUserId: profile.providerUserId,
        email: profile.email,
        accessToken: profile.accessToken,
        profileData: profile.raw,
      });
    }

    // 3. Cache in Redis RAM
    const sessionData = {
      id: endUser.id,
      projectId: endUser.projectId,
      email: endUser.email,
      name: endUser.name,
      avatarUrl: endUser.avatarUrl,
      userType: 'end_user',
    };
    await this.redisService.setUserSession(
      `end_user:${endUser.id}`,
      sessionData,
      15 * 60,
    );

    // 4. Generate Tokens
    const payload: TokenPayload = {
      sub: endUser.id,
      email: endUser.email,
      userType: 'end_user',
      projectId: endUser.projectId,
    };
    const tokens = await this.tokenService.generateTokens(payload);

    // 5. Store Refresh Token Hash
    const tokenHash = this.tokenService.hashToken(tokens.refreshToken);
    await this.db.insert(refreshTokens).values({
      userType: 'end_user',
      userId: endUser.id,
      tokenHash,
      userAgent: reqMeta?.userAgent,
      ipAddress: reqMeta?.ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.redisService.setRefreshTokenState(tokenHash, {
      userId: endUser.id,
      userType: 'end_user',
      projectId: endUser.projectId,
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: sessionData,
    };
  }

  /**
   * Token Rotation: Refresh access token using HttpOnly cookie
   */
  async refreshSession(
    refreshTokenString: string,
    reqMeta?: { userAgent?: string; ipAddress?: string },
  ) {
    if (!refreshTokenString) {
      throw new UnauthorizedException('Refresh token is required');
    }

    // 1. Verify token signature
    let decoded: any;
    try {
      decoded = await this.tokenService.verifyRefreshToken(refreshTokenString);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokenHash = this.tokenService.hashToken(refreshTokenString);

    // 2. Check if token is revoked in DB or RAM
    const existingTokens = await this.db
      .select()
      .from(refreshTokens)
      .where(
        and(
          eq(refreshTokens.tokenHash, tokenHash),
          eq(refreshTokens.revoked, false),
        ),
      )
      .limit(1);

    if (!existingTokens.length) {
      // Possible token reuse attack! Revoke all tokens for user.
      await this.redisService.deleteRefreshTokenState(tokenHash);
      throw new UnauthorizedException('Revoked or compromised refresh token');
    }

    // 3. Invalidate old refresh token (Strict Token Rotation)
    await this.db
      .update(refreshTokens)
      .set({ revoked: true, updatedAt: new Date() })
      .where(eq(refreshTokens.id, existingTokens[0].id));
    await this.redisService.deleteRefreshTokenState(tokenHash);

    // 4. Retrieve user and issue new tokens
    let userSession: any;
    let payload: TokenPayload;

    if (decoded.userType === 'app_user') {
      const usersFound = await this.db
        .select()
        .from(users)
        .where(eq(users.id, decoded.sub))
        .limit(1);

      if (!usersFound.length || usersFound[0].status !== 'active') {
        throw new UnauthorizedException('User account is inactive or deleted');
      }

      const u = usersFound[0];
      userSession = {
        id: u.id,
        email: u.email,
        name: u.name,
        avatarUrl: u.avatarUrl,
        role: u.role,
        userType: 'app_user',
      };
      payload = {
        sub: u.id,
        email: u.email,
        role: u.role,
        userType: 'app_user',
      };

      await this.redisService.setUserSession(u.id, userSession, 15 * 60);
    } else {
      const endUsersFound = await this.db
        .select()
        .from(endUsers)
        .where(eq(endUsers.id, decoded.sub))
        .limit(1);

      if (!endUsersFound.length || endUsersFound[0].status !== 'active') {
        throw new UnauthorizedException('End user account is inactive or deleted');
      }

      const eu = endUsersFound[0];
      userSession = {
        id: eu.id,
        projectId: eu.projectId,
        email: eu.email,
        name: eu.name,
        avatarUrl: eu.avatarUrl,
        userType: 'end_user',
      };
      payload = {
        sub: eu.id,
        email: eu.email,
        userType: 'end_user',
        projectId: eu.projectId,
      };

      await this.redisService.setUserSession(
        `end_user:${eu.id}`,
        userSession,
        15 * 60,
      );
    }

    // 5. Generate new tokens and store new refresh hash
    const newTokens = await this.tokenService.generateTokens(payload);
    const newTokenHash = this.tokenService.hashToken(newTokens.refreshToken);

    await this.db.insert(refreshTokens).values({
      userType: decoded.userType,
      userId: decoded.sub,
      tokenHash: newTokenHash,
      userAgent: reqMeta?.userAgent,
      ipAddress: reqMeta?.ipAddress,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    await this.redisService.setRefreshTokenState(newTokenHash, {
      userId: decoded.sub,
      userType: decoded.userType,
    });

    return {
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
      user: userSession,
    };
  }

  /**
   * Log out: Invalidate token in DB and delete session from RAM
   */
  async logout(userId: string, refreshTokenString?: string) {
    if (refreshTokenString) {
      const tokenHash = this.tokenService.hashToken(refreshTokenString);
      await this.db
        .update(refreshTokens)
        .set({ revoked: true, updatedAt: new Date() })
        .where(eq(refreshTokens.tokenHash, tokenHash));
      await this.redisService.deleteRefreshTokenState(tokenHash);
    }

    await this.redisService.deleteUserSession(userId);
    await this.redisService.deleteUserSession(`end_user:${userId}`);
  }
}
