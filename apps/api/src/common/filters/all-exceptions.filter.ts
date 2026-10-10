import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const requestId =
      (req.id as string) ||
      (req.headers['x-request-id'] as string) ||
      'N/A';

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any = null;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resObj = exceptionResponse as Record<string, any>;
        message = resObj.message || STATUS_CODES[statusCode] || 'Error';

        // Bóc tách mảng lỗi nếu do ValidationPipe bắn ra (thường là mảng string)
        if (Array.isArray(resObj.message)) {
          errors = resObj.message;
          message = 'Validation failed';
        } else if (resObj.errors) {
          errors = resObj.errors;
        }
      }
    } else if (exception instanceof Error) {
      // Ẩn stack trace lỗi server ở Production để bảo mật
      message =
        process.env.NODE_ENV === 'production'
          ? 'Internal server error'
          : exception.message;
    }

    const code =
      STATUS_CODES[statusCode]?.toUpperCase().replace(/\s+/g, '_') ||
      'INTERNAL_SERVER_ERROR';

    res.status(statusCode).json({
      ok: false,
      code,
      message,
      errors: errors ?? null,
      meta: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
