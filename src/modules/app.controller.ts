import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiModelProperty, ApiResponse } from '@nestjs/swagger';
import * as scraperjs from 'scraperjs';
import * as rp from 'request-promise-native';
import { ConsulService } from './consul/consul.service';

export class PageData {
  @ApiModelProperty()
  readonly url: string;

  @ApiModelProperty()
  readonly token: string;

  @ApiModelProperty()
  readonly id: string;
}

@Controller()
// @UseGuards(AuthGuard)
export class AppController {

  constructor(private consulService: ConsulService) {}

	@Get()
	async root() {
    return { doc: '/api' };
  }

  async _process(data: PageData) {
    return new Promise((resolve, reject) => {
      scraperjs.StaticScraper.create(data.url)
        .scrape(($) => {
          const x = $('.n288');
          if (x && x.length) {
            const electricity = (x[0].class || '').indexOf('m287') < 0;
            resolve({ electricity, watter: true, wifi: false, wc: false, shower: false });
          } else {
            reject();
          }
        });
    });
  }

  @Post('process')
  @ApiResponse({ status: 200, description: `Page processed`})
  async process(@Req() request, @Body() data: PageData) {
    try {
      const headers = { 'authorization': data.token || request.headers['authorization'] };
      const info = await this._process(data);
      const body = info;
      const storeUrl = this.consulService.getRandomServiceUri('rso-store');
      let entries = await rp.put(`${ storeUrl }/places/${ data.id }`, { json: true, headers, body });
      return { info, updated: true };
    } catch (e) {
      throw e;
    }
  }
}
