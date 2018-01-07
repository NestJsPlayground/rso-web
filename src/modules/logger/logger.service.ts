import { Component } from '@nestjs/common';
import * as winston from 'winston';
import { environment } from '../../environment';

@Component()
export class LoggerService {
  constructor() {
    const LoggingWinston = require('@google-cloud/logging-winston');

    require('winston-loggly-bulk');

    if (environment.loggly.token) {
      winston.add(winston.transports.Loggly, environment.loggly);
      winston.add(LoggingWinston);
    }
  }
}






