import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller()
// @UseGuards(AuthGuard)
export class AppController {

	@Get()
	async root() {
    return { doc: '/api' };
  }
}
