import { Guard, CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environment';

// USAGE:
// @UseGuards(AuthGuard)

@Guard()
export class AuthGuard implements CanActivate {
  canActivate(dataOrRequest, context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const token = dataOrRequest.headers['Authorization'] && dataOrRequest.headers['Authorization'].slice('Bearer '.length);
    if (environment.envType === 'prod') {

    }
    return true;
  }
}
