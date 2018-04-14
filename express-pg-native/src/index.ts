import * as express from 'express';
import { Client, native } from 'pg';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const app = express();
const pg: Client = new (native as any).Client('postgresql://load_test:123456@localhost:5432/load_test');

app.get('/', async (req, res) => {
  const result = await pg.query(`select * from material where type=$1`, [req.query.type]);
  res.send(result.rows);
});

app.get('/join', async (req, res) => {
  const result = await pg.query(`select * from material join author on material."authorId" = author.id where type=$1`, [req.query.type]);
  res.send(result.rows);
});

pg.connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app started at port ${process.env.PORT}`);
  });
});
