import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
// import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message;
    }

    // Handle validation errors
    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();
      const validationErrors =
        (exceptionResponse as any).message instanceof Array
          ? (exceptionResponse as any).message
          : [exceptionResponse];
      message = validationErrors[0]; // Ambil pesan pertama
    }

    response.status(status).json({
      status: 'error',
      statusCode: status,
      message,
    });
  }
}
