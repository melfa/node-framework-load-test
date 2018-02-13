import * as express from 'express';
import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const app = express();

const knex = Knex({
  client: 'pg',
  connection: 'postgresql://load_test:123456@localhost:5432/load_test',
});


const bookshelf = Bookshelf(knex);


const Material = bookshelf.Model.extend({
  tableName: 'material',
});

app.get('/', async (req, res) => {
  res.send(
    await (Material as any).where('type', req.query.type).fetchAll()
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Example app started at port ${process.env.PORT}`);
});
