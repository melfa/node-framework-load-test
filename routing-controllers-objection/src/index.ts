import 'reflect-metadata';
import { createExpressServer, QueryParam, Controller, Get } from 'routing-controllers';
import * as Knex from 'knex';
import { Model } from 'objection';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const knex = Knex({
  client: 'pg',
  connection: 'postgresql://load_test:123456@localhost:5432/load_test'
});


Model.knex(knex);

class Material extends Model {
  static get tableName() {
    return 'material';
  }
}

@Controller()
export class TestController {

  @Get('/')
  public async getAll(@QueryParam('type') type: string) {
    return await Material.query().where('type', type).orderBy('id');
  }

}

const app = createExpressServer({
  controllers: [TestController]
});

app.listen(process.env.PORT, () => {
  console.log(`Example app started at port ${process.env.PORT}`);
});
