import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { randomUUID } from 'node:crypto';
import { ConfigModule } from '@nestjs/config';
import type { Request } from 'express';

import { DatabaseModule } from './database/database.module.js';
import { RedisModule } from './redis/redis.module.js';
import { HealthModule } from './health/health.module.js';
import { AuthModule } from './auth/auth.module.js';
import { OrganizationsModule } from './organizations/organizations.module.js';
import { ProjectsModule } from './projects/projects.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    RedisModule,
    HealthModule,
    AuthModule,
    OrganizationsModule,
    ProjectsModule,

    LoggerModule.forRoot({
      pinoHttp: {
        // Request ID
        genReqId: (req: Request, res) => {
          const incomingId = req.headers['x-request-id'];

          // Chỉ chấp nhận request ID dạng string đơn
          const id =
            typeof incomingId === 'string' && incomingId.trim()
              ? incomingId
              : randomUUID();

          res.setHeader('x-request-id', id);
          return id;
        },

        // Custom serializers
        serializers: {
          req: (req: any) => ({
            id: req.id,
            method: req.method,
            url: req.url,
          }),

          res: (res: any) => ({
            statusCode: res.statusCode,
          }),

          err: (err: any) => ({
            type: err.type,
            message: err.message,
            stack: err.stack,
          }),
        },

        // Redact sensitive fields in production
        ...(process.env.NODE_ENV === 'production' && {
          redact: {
            paths: [
              'req.headers.authorization',
              'req.headers.cookie',
              'req.body.password',
              'req.body.token',
              'req.body.secret',
            ],
            censor: '[REDACTED]',
          },
        }),

        // Pretty transport: development only
        ...(process.env.NODE_ENV !== 'production' && {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:HH:MM:ss.l',
              ignore:
                'pid,hostname,context,req,res,responseTime,reqId',
              singleLine: true,
              errorLikeObjectKeys: ['err', 'error'],
              levelFirst: false,
              hideObject: true,
            },
          },
        }),

        // Log level
        level: process.env.LOG_LEVEL || 'info',

        // Ignore healthcheck requests
        autoLogging: {
          ignore: ({ url }: { url: string }) =>
            url === '/health' ||
            url === '/livez' ||
            url === '/readyz' ||
            url === '/metrics',
        },

        // Log level based on HTTP status
        customLogLevel: (req, res, err) => {
          if (res.statusCode >= 500 || err) {
            return 'error';
          }

          if (res.statusCode >= 400) {
            return 'warn';
          }

          return 'info';
        },

        // Response completed successfully
        customSuccessMessage: (req, res, responseTime) =>
          `${req.method} ${res.statusCode} ${req.url} ${Math.round(responseTime)}ms`,

        customErrorMessage: (req, res, err) =>
          `${req.method} ${res.statusCode} ${req.url} ${err?.message ?? ''}`,
      },
    }),
  ],
})
export class AppModule { }
