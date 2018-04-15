import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Client } from 'pg';

const pgFactory = {
  provide: 'pg',
  useFactory: async () => {
    const pg = new Client('postgresql://loadtest:123456@localhost:5432/loadtest');
    await pg.connect();
    return pg;
  },
};

@Module({
  imports: [],
  controllers: [AppController],
  components: [pgFactory],
})
export class ApplicationModule {}
