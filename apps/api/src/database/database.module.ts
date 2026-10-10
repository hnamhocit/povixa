import { Global, Module } from '@nestjs/common';
import { DatabaseService, DRIZZLE } from './database.service.js';

@Global()
@Module({
  providers: [
    DatabaseService,
    {
      provide: DRIZZLE,
      useFactory: (dbService: DatabaseService) => dbService.db,
      inject: [DatabaseService],
    },
  ],
  exports: [DatabaseService, DRIZZLE],
})
export class DatabaseModule {}
