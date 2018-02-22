import * as express from 'express';
import { Client, native } from 'pg';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const app = express();
let pg: Client;

app.get('/', async (req, res) => {
  if (!pg) {
    pg = new (native as any).Client('postgresql://load_test:123456@localhost:5432/load_test');
    await pg.connect();
  }
  const result = await pg.query(`select * from material where type=$1`, [req.query.type]);
  res.send(result.rows);
});

app.listen(process.env.PORT, () => {
  console.log(`Example app started at port ${process.env.PORT}`);
});
