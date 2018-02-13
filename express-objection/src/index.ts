import * as express from 'express';
import * as Knex from 'knex';
import { Model } from 'objection';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const app = express();

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


app.get('/', async (req, res) => {
  res.send(
    await Material.query().where('type', req.query.type)
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Example app started at port ${process.env.PORT}`);
});
