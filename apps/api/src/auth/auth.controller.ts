import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Req,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { OAuthService, type OAuthProvider } from './oauth.service.js';
import { TokenService } from './token.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly oauthService: OAuthService,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * List available OAuth providers and their status
   */
  @Get('providers')
  getProviders() {
    return {
      providers: [
        { id: 'google', name: 'Google OAuth', pkce: true },
        { id: 'github', name: 'GitHub OAuth', pkce: false },
        { id: 'discord', name: 'Discord OAuth', pkce: false },
        { id: 'facebook', name: 'Facebook Login', pkce: false },
      ],
    };
  }

  /**
   * Initiate App User OAuth: Returns authorization URL & PKCE state
   */
  @Get(':provider')
  initiateAppUserOAuth(
    @Param('provider') provider: OAuthProvider,
    @Query('redirect_uri') customRedirect?: string,
  ) {
    if (!['google', 'github', 'discord', 'facebook'].includes(provider)) {
      throw new BadRequestException(`Unsupported OAuth provider: ${provider}`);
    }

    const { url, state, codeVerifier } =
      this.oauthService.generateAppUserAuthUrl(provider, customRedirect);

    return {
      provider,
      authorizationUrl: url,
      state,
      ...(codeVerifier && { codeVerifier }),
    };
  }

  /**
   * App User OAuth Callback: Exchanges code for profile, sets HttpOnly refresh cookie, returns access token
   */
  @Get(':provider/callback')
  async appUserOAuthCallback(
    @Param('provider') provider: OAuthProvider,
    @Query('code') code: string,
    @Query('code_verifier') codeVerifier: string | undefined,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!code) {
      throw new BadRequestException('Authorization code is missing');
    }

    const reqMeta = {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    };

    const result = await this.authService.handleAppUserOAuth(
      provider,
      code,
      codeVerifier,
      reqMeta,
    );

    // Attach Refresh Token strictly to HTTP-Only Cookie
    this.tokenService.setRefreshTokenCookie(res, result.refreshToken);

    // Return Access Token & User metadata in JSON body
    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  /**
   * Initiate Project End User OAuth
   */
  @Get('project/:projectId/:provider')
  async initiateEndUserOAuth(
    @Param('projectId') projectId: string,
    @Param('provider') provider: OAuthProvider,
    @Query('redirect_uri') customRedirect?: string,
  ) {
    if (!['google', 'github', 'discord', 'facebook'].includes(provider)) {
      throw new BadRequestException(`Unsupported OAuth provider: ${provider}`);
    }

    const { url, state, codeVerifier } =
      await this.oauthService.generateEndUserAuthUrl(
        projectId,
        provider,
        customRedirect,
      );

    return {
      projectId,
      provider,
      authorizationUrl: url,
      state,
      ...(codeVerifier && { codeVerifier }),
    };
  }

  /**
   * Project End User OAuth Callback
   */
  @Get('project/:projectId/:provider/callback')
  async endUserOAuthCallback(
    @Param('projectId') projectId: string,
    @Param('provider') provider: OAuthProvider,
    @Query('code') code: string,
    @Query('code_verifier') codeVerifier: string | undefined,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!code) {
      throw new BadRequestException('Authorization code is missing');
    }

    const reqMeta = {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    };

    const result = await this.authService.handleEndUserOAuth(
      projectId,
      provider,
      code,
      codeVerifier,
      reqMeta,
    );

    // Attach Refresh Token strictly to HTTP-Only Cookie
    this.tokenService.setRefreshTokenCookie(res, result.refreshToken);

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  /**
   * Refresh Token Endpoint: Reads cookie, executes token rotation, updates cookie, returns new access token
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const rawRefreshToken = req.cookies?.refreshToken;

    if (!rawRefreshToken) {
      throw new BadRequestException(
        'Refresh token cookie is missing or expired',
      );
    }

    const reqMeta = {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    };

    const result = await this.authService.refreshSession(
      rawRefreshToken,
      reqMeta,
    );

    // Rotate refresh token cookie
    this.tokenService.setRefreshTokenCookie(res, result.refreshToken);

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  /**
   * Logout Endpoint: Invalidates session in RAM & DB, clears HttpOnly cookie
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const rawRefreshToken = req.cookies?.refreshToken;
    const userId = (req as any).user?.id;

    if (userId || rawRefreshToken) {
      await this.authService.logout(userId || '', rawRefreshToken);
    }

    this.tokenService.clearRefreshTokenCookie(res);

    return {
      message: 'Logged out successfully',
    };
  }

  /**
   * Get Current Authenticated User (RAM cached session)
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: any) {
    return {
      user: req.user,
    };
  }
}
