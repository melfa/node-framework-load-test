import 'reflect-metadata';
import { createExpressServer, QueryParam, Controller, Get } from 'routing-controllers';
import * as Knex from 'knex';
import { Model } from 'objection';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const knex = Knex({
  client: 'pg',
  connection: 'postgresql://load_test:123456@localhost:5432/load_test',
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
export class TestController {

  @Get('/')
  public async getAll(@QueryParam('type') type: string) {
    return Material.query()
      .where('type', type);
  }

  @Get('/join')
  public async join(@QueryParam('type') type: string) {
    return Material.query()
      .eager('author')
      .where('type', type);
  }

}

const app = createExpressServer({
  controllers: [TestController],
});

app.listen(process.env.PORT, () => {
  console.log(`Example app started at port ${process.env.PORT}`);
});
