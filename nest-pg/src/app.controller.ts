import { Get, Controller, Query } from '@nestjs/common';
import { Client } from 'pg';

@Controller()
export class AppController {
  protected pg?: Client;

  @Get()
  public async root(@Query('type') type: string) {
    if (!this.pg) {
      this.pg = new Client('postgresql://load_test:123456@localhost:5432/load_test');
      await this.pg.connect();
    }

    const result = await this.pg.query(`select * from material where type=$1`, [type]);
    return result.rows;
  }

}
