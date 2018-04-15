import * as express from 'express';
import * as Knex from 'knex';
import { Model } from 'objection';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const app = express();

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


app.get('/', async (req, res) => {
  res.send(
    await Material.query()
      .where('type', req.query.type)
  );
});

app.get('/join', async (req, res) => {
  res.send(
    await Material.query()
      .eager('author')
      .where('type', req.query.type)
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Example app started at port ${process.env.PORT}`);
});
