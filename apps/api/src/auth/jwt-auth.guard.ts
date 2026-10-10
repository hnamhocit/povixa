import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { TokenService } from './token.service.js';
import { RedisService } from '../redis/redis.service.js';
import { DRIZZLE, type DrizzleDB } from '../database/database.service.js';
import { users } from '../database/schema/users.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly redisService: RedisService,
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.substring(7).trim();

    try {
      const payload = await this.tokenService.verifyAccessToken(token);

      // Fast-path: Check session in Redis RAM (Sub-millisecond)
      const cached = await this.redisService.getUserSession(
        payload.userType === 'end_user' ? `end_user:${payload.sub}` : payload.sub,
      );

      if (cached) {
        req.user = cached;
        return true;
      }

      // Slow-path: Fetch from DB if Redis cache missed
      if (payload.userType === 'app_user') {
        const found = await this.db
          .select()
          .from(users)
          .where(eq(users.id, payload.sub))
          .limit(1);

        if (!found.length || found[0].status !== 'active') {
          throw new UnauthorizedException('User account is inactive or not found');
        }

        const user = found[0];
        const session = {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
          role: user.role,
          userType: 'app_user',
        };

        await this.redisService.setUserSession(user.id, session, 15 * 60);
        req.user = session;
        return true;
      } else {
        req.user = {
          id: payload.sub,
          email: payload.email,
          userType: 'end_user',
          projectId: payload.projectId,
        };
        return true;
      }
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }
}
