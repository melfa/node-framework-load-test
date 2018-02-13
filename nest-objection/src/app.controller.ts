import { Get, Controller, Query } from '@nestjs/common';
import * as Knex from 'knex';
import { Model } from 'objection';

const knex = Knex({
  client: 'pg',
  connection: 'postgresql://load_test:123456@localhost:5432/load_test',
});

Model.knex(knex);

class Material extends Model {
  static get tableName() {
    return 'material';
  }
}

@Controller()
export class AppController {
  @Get()
  public async root(@Query('type') type: string) {
    return Material.query().where('type', type).orderBy('id');
  }

}
