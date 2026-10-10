import { describe, it, expect, beforeEach } from 'vitest';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token.service.js';

describe('TokenService', () => {
  let tokenService: TokenService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(() => {
    jwtService = new JwtService();
    configService = new ConfigService({
      JWT_ACCESS_SECRET: 'test_access_secret_super_secure_32chars!',
      JWT_ACCESS_EXPIRES_IN: '15m',
      JWT_REFRESH_SECRET: 'test_refresh_secret_super_secure_32chars!',
      JWT_REFRESH_EXPIRES_IN: '7d',
    });
    tokenService = new TokenService(jwtService, configService);
  });

  it('should generate access and refresh tokens', async () => {
    const tokens = await tokenService.generateTokens({
      sub: 'user-123',
      email: 'dev@povixa.cloud',
      role: 'developer',
      userType: 'app_user',
    });

    expect(tokens.accessToken).toBeDefined();
    expect(tokens.refreshToken).toBeDefined();
    expect(tokens.expiresInSeconds).toBe(15 * 60);

    const verifiedAccess = await tokenService.verifyAccessToken(
      tokens.accessToken,
    );
    expect(verifiedAccess.sub).toBe('user-123');
    expect(verifiedAccess.email).toBe('dev@povixa.cloud');
    expect(verifiedAccess.userType).toBe('app_user');

    const verifiedRefresh = await tokenService.verifyRefreshToken(
      tokens.refreshToken,
    );
    expect(verifiedRefresh.sub).toBe('user-123');
    expect(verifiedRefresh.userType).toBe('app_user');
  });

  it('should hash tokens deterministically', () => {
    const hash1 = tokenService.hashToken('my-token-123');
    const hash2 = tokenService.hashToken('my-token-123');
    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(64); // SHA-256 hex string
  });
});
