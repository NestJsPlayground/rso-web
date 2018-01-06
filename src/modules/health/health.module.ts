import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { DatabaseModule } from '../database/database.module';
import { ConsulModule } from '../consul/consul.module';

@Module({
    controllers: [
      HealthController
    ],
    modules: [
      DatabaseModule,
      ConsulModule
    ],
    components: [],
})
export class HealthModule {}
