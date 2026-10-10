import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'node:crypto';
import type { Response } from 'express';

export interface TokenPayload {
  sub: string;
  email: string;
  role?: string;
  userType: 'app_user' | 'end_user';
  projectId?: string;
}

@Injectable()
export class TokenService {
  private readonly accessSecret: string;
  private readonly accessExpiresIn: string;
  private readonly refreshSecret: string;
  private readonly refreshExpiresIn: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessSecret =
      this.configService.get<string>('JWT_ACCESS_SECRET') ||
      'pvx_access_secret_super_secure_key_32chars_min!';
    this.accessExpiresIn =
      this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m';
    this.refreshSecret =
      this.configService.get<string>('JWT_REFRESH_SECRET') ||
      'pvx_refresh_secret_super_secure_key_32chars_min!';
    this.refreshExpiresIn =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';
  }

  /**
   * Generates Access Token (returned in JSON response)
   * and Refresh Token (attached to HttpOnly secure cookie)
   */
  async generateTokens(payload: TokenPayload): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresInSeconds: number;
  }> {
    const accessToken = await this.jwtService.signAsync(payload as any, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiresIn as any,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: payload.sub,
        userType: payload.userType,
        projectId: payload.projectId,
      } as any,
      {
        secret: this.refreshSecret,
        expiresIn: this.refreshExpiresIn as any,
      },
    );

    return {
      accessToken,
      refreshToken,
      expiresInSeconds: 15 * 60, // 15 mins
    };
  }

  async verifyAccessToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync<TokenPayload>(token, {
      secret: this.accessSecret,
    });
  }

  async verifyRefreshToken(token: string): Promise<{
    sub: string;
    userType: 'app_user' | 'end_user';
    projectId?: string;
  }> {
    return this.jwtService.verifyAsync(token, {
      secret: this.refreshSecret,
    });
  }

  /**
   * Generates SHA-256 hash of refresh token for safe storage in DB/Redis
   */
  hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  /**
   * Attaches refresh token to secure HTTP-Only cookie complying with modern security standards
   */
  setRefreshTokenCookie(res: Response, refreshToken: string): void {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax', // Lax enables top-level OAuth navigations while preventing CSRF
      path: '/v1/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
  }

  /**
   * Clears refresh token cookie on logout
   */
  clearRefreshTokenCookie(res: Response): void {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/v1/auth',
    });
  }
}
