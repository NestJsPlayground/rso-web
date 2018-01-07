import { Middleware, NestMiddleware, ExpressMiddleware, Req, ServiceUnavailableException } from '@nestjs/common';
import { info } from 'winston';
import { ConsulService } from '../consul/consul.service';

@Middleware()
export class MaintenanceMiddleware implements NestMiddleware {

  constructor(private consulService: ConsulService) {}

  resolve(): ExpressMiddleware {
    return (req, res, next) => {
      if (req.originalUrl !== '/health') {
       if (this.consulService.maintenance) {
         throw new ServiceUnavailableException();
       }
      }
      next();
    };
  }
}
