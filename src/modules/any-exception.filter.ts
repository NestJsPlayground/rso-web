import { HttpException, ExceptionFilter, Catch, InternalServerErrorException } from '@nestjs/common';
import { error } from 'winston';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception, response) {
    if (exception instanceof HttpException) {
      let resObj: any = exception.getResponse();
      if (typeof resObj === "string") {
        resObj = { message: resObj };
      }
      resObj.requestId = response.req.__id;

      response
        .status(exception.getStatus())
        .json(resObj);

      error('HTTP error response', resObj);
    } else {
      this.catch(new InternalServerErrorException(exception.message, exception), response);
    }
  }
}
