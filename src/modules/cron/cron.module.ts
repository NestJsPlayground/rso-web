import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ConsulModule } from '../consul/consul.module';
import { CronController } from './cron.controller';

@Module({
    controllers: [
      CronController
    ],
    modules: [
      DatabaseModule,
      ConsulModule
    ],
    components: [
    ],
})
export class CronModule {}
