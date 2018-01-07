import { Connection } from 'mongoose';
import { EntrySchema } from './schema';

export const entryProviders = [
  {
    provide: 'EntryModelToken',
    useFactory: (connection: Connection) => connection.model('Place', EntrySchema),
    inject: ['DbConnectionToken'],
  },
];
