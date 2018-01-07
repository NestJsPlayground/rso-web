import {
  Guard, CanActivate, ExecutionContext, UseGuards, UnauthorizedException,
  ServiceUnavailableException
} from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environment';
import * as rp from 'request-promise-native';
import { ConsulService } from '../consul/consul.service';

// USAGE:
// @UseGuards(AuthGuard)

@Guard()
export class AuthGuard implements CanActivate {

  constructor(private consulService: ConsulService) {}

  async canActivate(dataOrRequest, context: ExecutionContext): Promise<boolean> {
    const token = dataOrRequest.headers['authorization'] && dataOrRequest.headers['authorization'].slice('Bearer '.length);
    if (environment.envType !== 'test') {
      const authUrl = this.consulService.getRandomServiceUri('rso-auth');
      if (!authUrl) {
        throw new ServiceUnavailableException();
      }
      try {
        dataOrRequest.user = await rp({uri: `${ authUrl }/user/token-valid/${ token }`, json: true});
        return true;
      } catch (e) {
        if (e && e.cause && e.cause.code === 'ECONNREFUSED') {
          throw new ServiceUnavailableException();
        }
        return false;
      }
    } else {
      return true;
    }
  }
}
