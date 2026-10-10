import {
  Injectable,
  OnApplicationShutdown,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  private readonly logger = new Logger(RedisService.name);
  public readonly client: Redis;

  constructor(private readonly configService: ConfigService) {
    const redisUrl = this.configService.get<string>('REDIS_URL');

    if (redisUrl) {
      this.client = new Redis(redisUrl, {
        lazyConnect: true,
        maxRetriesPerRequest: 3,
        retryStrategy: (times) => Math.min(times * 100, 3000),
      });
    } else {
      const host = this.configService.get<string>('REDIS_HOST', 'localhost');
      const port = this.configService.get<number>('REDIS_PORT', 6379);
      const password = this.configService.get<string>('REDIS_PASSWORD');

      this.client = new Redis({
        host,
        port,
        password: password || undefined,
        lazyConnect: true,
        maxRetriesPerRequest: 3,
        retryStrategy: (times) => Math.min(times * 100, 3000),
      });
    }

    this.client.on('error', (err) => {
      this.logger.warn(`Redis client error: ${err.message}`);
    });

    this.client.connect().catch((err) => {
      this.logger.warn(`Initial Redis connection failed: ${err.message}`);
    });
  }

  /**
   * Healthcheck ping returning status and latency
   */
  async ping(): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
    const start = performance.now();
    try {
      const res = await this.client.ping();
      return {
        ok: res === 'PONG',
        latencyMs: Math.round(performance.now() - start),
      };
    } catch (err: any) {
      return {
        ok: false,
        latencyMs: Math.round(performance.now() - start),
        error: err?.message || 'Redis connection failed',
      };
    }
  }

  /**
   * Store user session in RAM (Redis)
   * Default TTL: 15 minutes (aligned with access token) or custom
   */
  async setUserSession(
    userId: string,
    sessionData: Record<string, any>,
    ttlSeconds = 900,
  ): Promise<void> {
    const key = `pvx:session:${userId}`;
    await this.client.set(key, JSON.stringify(sessionData), 'EX', ttlSeconds);
  }

  /**
   * Fetch user session directly from RAM
   */
  async getUserSession<T = any>(userId: string): Promise<T | null> {
    const key = `pvx:session:${userId}`;
    const raw = await this.client.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  /**
   * Invalidate user session from RAM
   */
  async deleteUserSession(userId: string): Promise<void> {
    const key = `pvx:session:${userId}`;
    await this.client.del(key);
  }

  /**
   * Store refresh token rotation state in RAM
   */
  async setRefreshTokenState(
    tokenHash: string,
    metadata: Record<string, any>,
    ttlSeconds = 7 * 24 * 60 * 60,
  ): Promise<void> {
    const key = `pvx:refresh:${tokenHash}`;
    await this.client.set(key, JSON.stringify(metadata), 'EX', ttlSeconds);
  }

  async getRefreshTokenState<T = any>(tokenHash: string): Promise<T | null> {
    const key = `pvx:refresh:${tokenHash}`;
    const raw = await this.client.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async deleteRefreshTokenState(tokenHash: string): Promise<void> {
    const key = `pvx:refresh:${tokenHash}`;
    await this.client.del(key);
  }

  async onApplicationShutdown() {
    this.logger.log('Disconnecting Redis client...');
    try {
      await this.client.quit();
    } catch {
      this.client.disconnect();
    }
  }
}
