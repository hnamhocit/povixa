import {
  Injectable,
  BadRequestException,
  Inject,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GitHub,
  Google,
  Discord,
  Facebook,
  generateState,
  generateCodeVerifier,
} from 'arctic';
import { eq, and } from 'drizzle-orm';
import { DRIZZLE, type DrizzleDB } from '../database/database.service.js';
import { projectOAuthConfigs } from '../database/schema/oauth.js';

export type OAuthProvider = 'google' | 'facebook' | 'github' | 'discord';

export interface NormalizedOAuthProfile {
  provider: OAuthProvider;
  providerUserId: string;
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
  accessToken: string;
  refreshToken?: string;
  raw: Record<string, any>;
}

@Injectable()
export class OAuthService {
  private readonly logger = new Logger(OAuthService.name);

  constructor(
    private readonly configService: ConfigService,
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
  ) {}

  /**
   * Helper to instantiate Arctic provider client using platform env credentials
   */
  private getPlatformProviderClient(
    provider: OAuthProvider,
    customCallback?: string,
  ) {
    switch (provider) {
      case 'github': {
        const clientId = this.configService.get<string>('GITHUB_CLIENT_ID');
        const clientSecret = this.configService.get<string>('GITHUB_CLIENT_SECRET');
        const callbackUrl =
          customCallback ||
          this.configService.get<string>(
            'GITHUB_CALLBACK_URL',
            'http://localhost:8080/v1/auth/github/callback',
          );
        if (!clientId || !clientSecret) {
          throw new BadRequestException('GitHub OAuth credentials are not configured');
        }
        return new GitHub(clientId, clientSecret, callbackUrl);
      }
      case 'google': {
        const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
        const callbackUrl =
          customCallback ||
          this.configService.get<string>(
            'GOOGLE_CALLBACK_URL',
            'http://localhost:8080/v1/auth/google/callback',
          );
        if (!clientId || !clientSecret) {
          throw new BadRequestException('Google OAuth credentials are not configured');
        }
        return new Google(clientId, clientSecret, callbackUrl);
      }
      case 'discord': {
        const clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
        const clientSecret = this.configService.get<string>('DISCORD_CLIENT_SECRET');
        const callbackUrl =
          customCallback ||
          this.configService.get<string>(
            'DISCORD_CALLBACK_URL',
            'http://localhost:8080/v1/auth/discord/callback',
          );
        if (!clientId || !clientSecret) {
          throw new BadRequestException('Discord OAuth credentials are not configured');
        }
        return new Discord(clientId, clientSecret, callbackUrl);
      }
      case 'facebook': {
        const clientId = this.configService.get<string>('FACEBOOK_CLIENT_ID');
        const clientSecret = this.configService.get<string>('FACEBOOK_CLIENT_SECRET');
        const callbackUrl =
          customCallback ||
          this.configService.get<string>(
            'FACEBOOK_CALLBACK_URL',
            'http://localhost:8080/v1/auth/facebook/callback',
          );
        if (!clientId || !clientSecret) {
          throw new BadRequestException('Facebook OAuth credentials are not configured');
        }
        return new Facebook(clientId, clientSecret, callbackUrl);
      }
      default:
        throw new BadRequestException('Unsupported OAuth provider');
    }
  }

  /**
   * Helper to instantiate Arctic provider client dynamically configured for a Project
   */
  private async getProjectProviderClient(
    projectId: string,
    provider: OAuthProvider,
    customCallback?: string,
  ) {
    const configs = await this.db
      .select()
      .from(projectOAuthConfigs)
      .where(
        and(
          eq(projectOAuthConfigs.projectId, projectId),
          eq(projectOAuthConfigs.provider, provider),
          eq(projectOAuthConfigs.enabled, true),
        ),
      )
      .limit(1);

    if (!configs.length) {
      throw new BadRequestException(
        `OAuth provider ${provider} is not configured or disabled for this project`,
      );
    }

    const cfg = configs[0];
    const callbackUrl =
      customCallback ||
      cfg.callbackUrl ||
      `http://localhost:8080/v1/auth/project/${projectId}/${provider}/callback`;

    switch (provider) {
      case 'github':
        return new GitHub(cfg.clientId, cfg.clientSecret, callbackUrl);
      case 'google':
        return new Google(cfg.clientId, cfg.clientSecret, callbackUrl);
      case 'discord':
        return new Discord(cfg.clientId, cfg.clientSecret, callbackUrl);
      case 'facebook':
        return new Facebook(cfg.clientId, cfg.clientSecret, callbackUrl);
      default:
        throw new BadRequestException('Unsupported OAuth provider');
    }
  }

  /**
   * Generates Authorization URL for Platform App Users
   */
  generateAppUserAuthUrl(
    provider: OAuthProvider,
    customCallback?: string,
  ): { url: string; state: string; codeVerifier?: string } {
    const client = this.getPlatformProviderClient(provider, customCallback);
    const state = generateState();

    if (provider === 'google') {
      const codeVerifier = generateCodeVerifier();
      const url = (client as Google)
        .createAuthorizationURL(state, codeVerifier, ['openid', 'email', 'profile'])
        .toString();
      return { url, state, codeVerifier };
    }

    if (provider === 'github') {
      const url = (client as GitHub)
        .createAuthorizationURL(state, ['read:user', 'user:email'])
        .toString();
      return { url, state };
    }

    if (provider === 'discord') {
      const url = (client as Discord)
        .createAuthorizationURL(state, null, ['identify', 'email'])
        .toString();
      return { url, state };
    }

    if (provider === 'facebook') {
      const url = (client as Facebook)
        .createAuthorizationURL(state, ['public_profile', 'email'])
        .toString();
      return { url, state };
    }

    throw new BadRequestException('Unsupported OAuth provider');
  }

  /**
   * Generates Authorization URL for Project End Users
   */
  async generateEndUserAuthUrl(
    projectId: string,
    provider: OAuthProvider,
    customCallback?: string,
  ): Promise<{ url: string; state: string; codeVerifier?: string }> {
    const client = await this.getProjectProviderClient(
      projectId,
      provider,
      customCallback,
    );
    const state = `${projectId}__${generateState()}`;

    if (provider === 'google') {
      const codeVerifier = generateCodeVerifier();
      const url = (client as Google)
        .createAuthorizationURL(state, codeVerifier, ['openid', 'email', 'profile'])
        .toString();
      return { url, state, codeVerifier };
    }

    if (provider === 'github') {
      const url = (client as GitHub)
        .createAuthorizationURL(state, ['read:user', 'user:email'])
        .toString();
      return { url, state };
    }

    if (provider === 'discord') {
      const url = (client as Discord)
        .createAuthorizationURL(state, null, ['identify', 'email'])
        .toString();
      return { url, state };
    }

    if (provider === 'facebook') {
      const url = (client as Facebook)
        .createAuthorizationURL(state, ['public_profile', 'email'])
        .toString();
      return { url, state };
    }

    throw new BadRequestException('Unsupported OAuth provider');
  }

  /**
   * Exchanges code and fetches normalized profile for App Users
   */
  async validateAppUserCode(
    provider: OAuthProvider,
    code: string,
    codeVerifier?: string,
  ): Promise<NormalizedOAuthProfile> {
    const client = this.getPlatformProviderClient(provider);
    return this.exchangeAndFetchProfile(client, provider, code, codeVerifier);
  }

  /**
   * Exchanges code and fetches normalized profile for Project End Users
   */
  async validateEndUserCode(
    projectId: string,
    provider: OAuthProvider,
    code: string,
    codeVerifier?: string,
  ): Promise<NormalizedOAuthProfile> {
    const client = await this.getProjectProviderClient(projectId, provider);
    return this.exchangeAndFetchProfile(client, provider, code, codeVerifier);
  }

  private async exchangeAndFetchProfile(
    client: any,
    provider: OAuthProvider,
    code: string,
    codeVerifier?: string,
  ): Promise<NormalizedOAuthProfile> {
    try {
      let tokens: any;
      if (provider === 'google') {
        if (!codeVerifier) {
          throw new BadRequestException('Code verifier is required for Google OAuth PKCE');
        }
        tokens = await (client as Google).validateAuthorizationCode(
          code,
          codeVerifier,
        );
      } else {
        tokens = await client.validateAuthorizationCode(code);
      }

      const accessToken = tokens.accessToken();

      // Fetch user profile from respective provider API
      switch (provider) {
        case 'github': {
          const res = await fetch('https://api.github.com/user', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'User-Agent': 'Povixa-Auth-Server',
            },
          });
          const user = await res.json();

          // Fetch primary email if hidden
          let email = user.email;
          if (!email) {
            try {
              const emailRes = await fetch('https://api.github.com/user/emails', {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'User-Agent': 'Povixa-Auth-Server',
                },
              });
              const emails = await emailRes.json();
              if (Array.isArray(emails)) {
                const primary = emails.find((e: any) => e.primary && e.verified);
                email = primary ? primary.email : emails[0]?.email;
              }
            } catch {
              // ignore
            }
          }

          return {
            provider: 'github',
            providerUserId: String(user.id),
            email: email || null,
            name: user.name || user.login || null,
            avatarUrl: user.avatar_url || null,
            accessToken,
            raw: user,
          };
        }

        case 'google': {
          const res = await fetch(
            'https://openidconnect.googleapis.com/v1/userinfo',
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            },
          );
          const user = await res.json();
          return {
            provider: 'google',
            providerUserId: user.sub,
            email: user.email || null,
            name: user.name || null,
            avatarUrl: user.picture || null,
            accessToken,
            raw: user,
          };
        }

        case 'discord': {
          const res = await fetch('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const user = await res.json();
          const avatarUrl = user.avatar
            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
            : null;
          return {
            provider: 'discord',
            providerUserId: user.id,
            email: user.email || null,
            name: user.global_name || user.username || null,
            avatarUrl,
            accessToken,
            raw: user,
          };
        }

        case 'facebook': {
          const res = await fetch(
            `https://graph.facebook.com/me?fields=id,name,email,picture.width(200).height(200)&access_token=${accessToken}`,
          );
          const user = await res.json();
          return {
            provider: 'facebook',
            providerUserId: user.id,
            email: user.email || null,
            name: user.name || null,
            avatarUrl: user.picture?.data?.url || null,
            accessToken,
            raw: user,
          };
        }

        default:
          throw new BadRequestException('Unsupported OAuth provider');
      }
    } catch (err: any) {
      this.logger.error(`OAuth token exchange error (${String(provider)}):`, err);
      throw new BadRequestException(`OAuth exchange failed: ${err.message}`);
    }
  }
}
