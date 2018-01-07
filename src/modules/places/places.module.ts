import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { entryProviders } from './places.providers';
import { PlacesController } from './places.controller';
import { ConsulModule } from '../consul/consul.module';

@Module({
    controllers: [
      PlacesController
    ],
    modules: [
      DatabaseModule,
      ConsulModule
    ],
    components: [
      ...entryProviders
    ],
})
export class PlacesModule {}
