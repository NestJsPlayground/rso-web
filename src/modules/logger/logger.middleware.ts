import { Middleware, NestMiddleware, ExpressMiddleware, Req } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { info } from 'winston';
import * as uuidv1 from 'uuid/v1';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {

  constructor() {}

  resolve(): ExpressMiddleware {
    return (req, res, next) => {
      if (req.originalUrl !== '/health') {
        info('HTTP request', {
          originalUrl: req.originalUrl,
          ip         : req.ip
        });
      }
      req.__id = uuidv1();
      next();
    };
  }
}
