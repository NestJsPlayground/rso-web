import { Component } from '@nestjs/common';
import * as os from 'os';
import * as Consul from 'consul';
import { info, error } from 'winston';
import { environment } from '../../environment';

@Component()
export class ConsulService {

  watchMap = {};

  watchValues = {
    'core/maintenance': true as any,
  };

  consul = Consul(environment.consul);

  static serviceRegistered: boolean = false;

  get maintenance(): boolean {
    return !!this.watchValues['core/maintenance'];
  }

  constructor() {
    this.init();

    const self = this;
    process.on('uncaughtException', function (err) {
      // catch consul error
      if (err && err.message === 'consul: kv.get: socket hang up') {
        error('Consul: socket hang up');
        ConsulService.serviceRegistered = false;
        setTimeout(() => {
          self.init();
        }, 10 * 1000)
      } else {
        throw err;
      }
    });
  }

  init() {
    info('Trying to connect to consul.');
    try {
      this.consul = this.consul || Consul(environment.consul);
      this.registerService();
    } catch (e) {
      error(e);
      setTimeout(() => {
        this.init();
      }, 10 * 1000)
    }
  }

  registerService() {
    const networkInterfaces = os.networkInterfaces();
    const itf = networkInterfaces['eth0'] || networkInterfaces['ens33'];

    const service: Consul.Agent.Service.RegisterOptions = {
      name: 'rso-seed',
      id: 'rso-id',
      tags: [ 'rso-seed-tag' ],
      // address: itf[0].address,
      // port
      check: {
        http : `http://${ itf[0].address }:3000/health`,
        ttl: '10s',
        interval: '10s',
        status: 'passing',
        notes: 'API health check.',
      }
    };

    this.consul.agent.service.register(service, (err) => {
      if (err) {
        error('Consul service register error.', err);
        setTimeout(() => {
          this.registerService();
        }, 10 * 1000)
      } else {
        this.initWatch();
        ConsulService.serviceRegistered = true;
      }
    });
  }

  initWatch() {
    try {
      this.watch('core/maintenance', false);
    } catch (e) {
      error('There was problem with consul', e);
    }
  }

  get(key): Promise<any> {
    return new Promise((resolve, reject) => {
      this.consul.kv.get(key, function(err, result) {
        if (err) {
          error(`Get consule data for ${ key } failed.`, err);
          reject(err);
        } else {
          info(`Get consule data for ${ key }: `, result);
          resolve(result);
        }
      });
    });
  }

  watch(key: string, defaultVal?: any) {
    try {
      if (!this.watchMap[key]) {
        this.watchMap[key] = this.consul.watch({method: this.consul.kv.get, options: {key}});
        this.watchMap[key].on('change', (data, res) => {
          info(`Consule data for ${ key }: `, data);
          this.watchValues[key] = data ? data.Value : defaultVal;
        });
      }
    } catch (e) {
      error('There was problem with consul', e);
    }
  }
}
