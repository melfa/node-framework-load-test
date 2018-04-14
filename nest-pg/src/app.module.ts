import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Client } from 'pg';

const pgFactory = {
  provide: 'pg',
  useFactory: async () => {
    const pg = new Client('postgresql://load_test:123456@localhost:5432/load_test');
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
