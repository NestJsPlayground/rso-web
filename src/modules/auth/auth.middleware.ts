import { Middleware, NestMiddleware, ExpressMiddleware, Req } from '@nestjs/common';
import { environment } from '../../environment';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  resolve(): ExpressMiddleware {
    return (req, res, next) => {
      const token = req.headers['Authorization'] && req.headers['Authorization'].slice('Bearer '.length);
      if (environment.envType === 'prod') {

      }
      next();
    };
  }
}
