import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';

import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator.js';
import { ApiSuccessResponse } from '../interfaces/api-response.interface.js';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, ApiSuccessResponse<T>> {
  constructor(private readonly reflector: Reflector) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiSuccessResponse<T>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const startTime = Date.now();
    const requestId =
      (req.id as string) ||
      (req.headers['x-request-id'] as string) ||
      'N/A';

    return next.handle().pipe(
      map((responseData) => {
        const statusCode = res.statusCode;

        // 1. Map HTTP status sang mã code: 200 -> "OK", 201 -> "CREATED"
        const httpStatusText =
          STATUS_CODES[statusCode]?.toUpperCase().replace(/\s+/g, '_') ||
          'SUCCESS';

        // 2. Lấy custom message từ @ResponseMessage() hoặc fallback theo HTTP status
        const customMessage = this.reflector.getAllAndOverride<string>(
          RESPONSE_MESSAGE_KEY,
          [context.getHandler(), context.getClass()],
        );
        const finalMessage = customMessage || STATUS_CODES[statusCode] || 'Success';

        // 3. Tách biệt meta phân trang nếu controller trả về object { data, meta }
        let extractedData = responseData;
        let extraMeta = {};

        if (
          responseData &&
          typeof responseData === 'object' &&
          !Array.isArray(responseData) &&
          'data' in responseData
        ) {
          extractedData = responseData.data;
          extraMeta = responseData.meta || {};
        }

        return {
          ok: true,
          code: httpStatusText,
          message: finalMessage,
          data: extractedData ?? null,
          meta: {
            requestId,
            executionTime: `${Date.now() - startTime}ms`,
            timestamp: new Date().toISOString(),
            ...extraMeta,
          },
        };
      }),
    );
  }
}
