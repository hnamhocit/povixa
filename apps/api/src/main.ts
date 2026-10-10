import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module.js';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor.js';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  const cookieSecret = configService.get<string>(
    'COOKIE_SECRET',
    'pvx_cookie_secret_default',
  );
  app.use(cookieParser(cookieSecret));

  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ field không khai báo trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu client truyền field lạ
      transform: true, // Tự động convert payload sang DTO class instance
      transformOptions: {
        enableImplicitConversion: true, // Tự ép kiểu string -> number/boolean nếu DTO khai báo
      },
    }),
  );

  // 3. Global Interceptor chuẩn hóa response { ok, code, message, data, meta }
  app.useGlobalInterceptors(new TransformResponseInterceptor(reflector));
  app.useGlobalFilters(new AllExceptionsFilter());

  // 4. API Versioning mặc định v1 (/v1/...)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // 5. Cấu hình CORS
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  const allowedOrigins = configService
    .get<string>('CORS_ORIGINS', 'http://localhost:3000,http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim());

  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin || allowedOrigins.includes(origin) || !isProduction) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by CORS policy'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-request-id',
      'Accept',
      'Origin',
    ],
    exposedHeaders: ['x-request-id'],
    credentials: true,
    maxAge: 86400,
  });

  const port = configService.get<number>('PORT', 8080);
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}
void bootstrap();
