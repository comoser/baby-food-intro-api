import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction) {
    const { baseUrl, method } = request;
    response.on('finish', () => {
      const { statusCode } = response;

      this.logger.log(`${method} ${baseUrl} - ${statusCode}`);
    });
    next();
  }
}
