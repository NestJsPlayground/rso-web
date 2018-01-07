import { Middleware, NestMiddleware, ExpressMiddleware, Req, UnauthorizedException } from '@nestjs/common';
import { environment } from '../../environment';
import * as rp from 'request-promise-native';
import { ConsulService } from '../consul/consul.service';

@Middleware()
export class AuthMiddleware implements NestMiddleware {

  constructor(private consulService: ConsulService) {}

  async resolve(): Promise<ExpressMiddleware> {
    return async (req, res, next) => {
      const token = req.headers['Authorization'] && req.headers['Authorization'].slice('Bearer '.length);
      if (environment.envType !== 'test') {
        const authUrl = this.consulService.getRandomServiceUri('rso-auth');
        try {
          req.user = await rp({uri: `${ authUrl }/user/token-valid/${ token }`, json: true});
          next();
        } catch (e) {
          throw new UnauthorizedException();
        }
      } else {
        next();
      }
    };
  }
}
