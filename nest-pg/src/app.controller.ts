import { Get, Controller, Query, Inject } from '@nestjs/common';
import { Client } from 'pg';

@Controller()
export class AppController {
  protected pg: Client;

  constructor(@Inject('pg') pg: Client) {
    this.pg = pg;
  }
  
  @Get()
  public async root(@Query('type') type: string) {
    const result = await this.pg.query(`select * from material where type=$1`, [type]);
    return result.rows;
  }

  @Get('join')
  public async join(@Query('type') type: string) {
    const result = await this.pg.query(
      `select * from material join author on material."authorId" = author.id where type=$1`,
      [type],
    );
    return result.rows;
  }

}
