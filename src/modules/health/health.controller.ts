import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { ConsulService } from '../consul/consul.service';

@ApiUseTags('seed health')
@Controller('health')
export class HealthController {

  constructor(private consulService: ConsulService) {}

  @Get()
  @ApiResponse({ status: 200, description: `Service health is ok.`})
  root() {
    throw new Error('df');
    // return {
    //   serviceRegistered: ConsulService.serviceRegistered,
    //   maintenance: this.consulService.maintenance,
    //   api: 'OK',
    //   serverTime: new Date()
    // };
  }
}
