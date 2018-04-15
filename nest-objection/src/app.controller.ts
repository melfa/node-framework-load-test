import { Get, Controller, Query } from '@nestjs/common';
import * as Knex from 'knex';
import { Model } from 'objection';

const knex = Knex({
  client: 'pg',
  connection: 'postgresql://loadtest:123456@localhost:5432/loadtest',
});

Model.knex(knex);

class Author extends Model {
  public static tableName = 'author';
}

class Material extends Model {
  public static tableName = 'material';

  public static relationMappings = {
    author: {
      relation: Model.HasOneRelation,
      modelClass: Author,
      join: {
        from: 'material.authorId',
        to: 'author.id',
      },
    },
  };

}

@Controller()
export class AppController {

  @Get()
  public async root(@Query('type') type: string) {
    return Material.query()
      .where('type', type);
  }

  @Get('join')
  public async join(@Query('type') type: string) {
    return Material.query()
      .eager('author')
      .where('type', type);
  }

}
