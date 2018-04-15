import * as express from 'express';
import { Client } from 'pg';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const app = express();
const pg: Client = new Client('postgresql://loadtest:123456@localhost:5432/loadtest');

app.get('/', async (req, res) => {
  const result = await pg.query(`select * from material where type=$1`, [req.query.type]);
  res.send(result.rows);
});

app.get('/join', async (req, res) => {
  const result = await pg.query(
    `select * from material join author on material."authorId" = author.id where type=$1`,
    [req.query.type],
  );
  res.send(result.rows);
});

pg.connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app started at port ${process.env.PORT}`);
  });
});
