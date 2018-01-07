import { Middleware, NestMiddleware, ExpressMiddleware, Req } from '@nestjs/common';
import { info } from 'winston';
import * as uuidv1 from 'uuid/v1';

@Middleware()
export class LoggerMiddleware implements NestMiddleware {

  constructor() {}

  resolve(): ExpressMiddleware {
    return (req, res, next) => {
      if (req.originalUrl !== '/health') {
        info(`${req.url} endpoint hit`, {
          httpRequest: {
            status: res.statusCode,
            requestUrl: req.url,
            requestMethod: req.method,
            remoteIp: req.connection.remoteAddress
          }
        });
      }
      req.__id = uuidv1();
      next();
    };
  }
}
