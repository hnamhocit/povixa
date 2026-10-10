import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ServiceUnavailableException,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { RedisService } from '../redis/redis.service.js';

@Controller({ version: VERSION_NEUTRAL })
export class HealthController {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Liveness Probe (/livez & /livesz)
   * Kubernetes/Docker probe to verify the application process is alive.
   */
  @Get(['livez', 'livesz'])
  @HttpCode(HttpStatus.OK)
  getLiveness() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
    };
  }

  /**
   * Readiness Probe (/readyz)
   * Verifies critical dependencies: PostgreSQL 18 & Redis 8
   */
  @Get('readyz')
  async getReadiness() {
    const [pgResult, redisResult] = await Promise.all([
      this.dbService.ping(),
      this.redisService.ping(),
    ]);

    const isReady = pgResult.ok && redisResult.ok;

    const payload = {
      status: isReady ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      dependencies: {
        postgres: {
          status: pgResult.ok ? 'up' : 'down',
          latencyMs: pgResult.latencyMs,
          ...(pgResult.error && { error: pgResult.error }),
        },
        redis: {
          status: redisResult.ok ? 'up' : 'down',
          latencyMs: redisResult.latencyMs,
          ...(redisResult.error && { error: redisResult.error }),
        },
      },
    };

    if (!isReady) {
      throw new ServiceUnavailableException(payload);
    }

    return payload;
  }

  /**
   * Comprehensive Diagnostics (/healthz & /health)
   */
  @Get(['healthz', 'health'])
  async getHealth() {
    const [pgResult, redisResult] = await Promise.all([
      this.dbService.ping(),
      this.redisService.ping(),
    ]);

    const memoryUsage = process.memoryUsage();

    return {
      status: pgResult.ok && redisResult.ok ? 'ok' : 'degraded',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      dependencies: {
        postgres: {
          status: pgResult.ok ? 'up' : 'down',
          latencyMs: pgResult.latencyMs,
          error: pgResult.error || null,
        },
        redis: {
          status: redisResult.ok ? 'up' : 'down',
          latencyMs: redisResult.latencyMs,
          error: redisResult.error || null,
        },
      },
      system: {
        memory: {
          rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
          heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
          heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
          externalMb: Math.round(memoryUsage.external / 1024 / 1024),
        },
        nodeVersion: process.version,
        platform: process.platform,
      },
    };
  }
}
