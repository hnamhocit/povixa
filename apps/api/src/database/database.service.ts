import {
  Injectable,
  OnApplicationShutdown,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import postgres from 'postgres';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from './schema/index.js';

export const DRIZZLE = 'DRIZZLE_ORM_CONNECTION';
export type DrizzleDB = PostgresJsDatabase<typeof schema>;

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseService.name);
  public readonly client: postgres.Sql;
  public readonly db: DrizzleDB;

  constructor(private readonly configService: ConfigService) {
    const databaseUrl =
      this.configService.get<string>('DATABASE_URL') ||
      'postgresql://postgres:postgres@localhost:5432/povixa?sslmode=disable';

    this.logger.log('Initializing PostgreSQL database connection pool...');

    this.client = postgres(databaseUrl, {
      max: this.configService.get<number>('DB_POOL_MAX', 10),
      idle_timeout: 20,
      connect_timeout: 10,
    });

    this.db = drizzle(this.client, { schema });
  }

  async ping(): Promise<{ ok: boolean; latencyMs: number; error?: string }> {
    const start = performance.now();
    try {
      await this.client`SELECT 1`;
      return {
        ok: true,
        latencyMs: Math.round(performance.now() - start),
      };
    } catch (err: any) {
      return {
        ok: false,
        latencyMs: Math.round(performance.now() - start),
        error: err?.message || 'Database connection error',
      };
    }
  }

  async onApplicationShutdown() {
    this.logger.log('Gracefully closing PostgreSQL connection pool...');
    await this.client.end({ timeout: 5 });
  }
}
