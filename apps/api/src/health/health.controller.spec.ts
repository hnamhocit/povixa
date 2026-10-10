import { describe, it, expect, vi } from 'vitest';
import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  it('should return liveness status', () => {
    const mockDbService = {} as any;
    const mockRedisService = {} as any;
    const controller = new HealthController(mockDbService, mockRedisService);

    const liveness = controller.getLiveness();
    expect(liveness.status).toBe('ok');
    expect(liveness.timestamp).toBeDefined();
    expect(typeof liveness.uptimeSeconds).toBe('number');
  });

  it('should return readiness when dependencies are up', async () => {
    const mockDbService = {
      ping: vi.fn().mockResolvedValue({ ok: true, latencyMs: 3 }),
    } as any;
    const mockRedisService = {
      ping: vi.fn().mockResolvedValue({ ok: true, latencyMs: 1 }),
    } as any;

    const controller = new HealthController(mockDbService, mockRedisService);
    const readiness = await controller.getReadiness();

    expect(readiness.status).toBe('ok');
    expect(readiness.dependencies.postgres.status).toBe('up');
    expect(readiness.dependencies.redis.status).toBe('up');
  });
});
