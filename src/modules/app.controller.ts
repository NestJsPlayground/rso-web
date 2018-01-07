import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiModelProperty } from '@nestjs/swagger';

@Controller()
// @UseGuards(AuthGuard)
export class AppController {

	@Get()
	async root() {
    return { doc: '/api' };
  }
}
