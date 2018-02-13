import * as express from 'express';
import { Client } from 'pg';
import * as log4js from 'log4js';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const app = express();
let pg: Client;

log4js.configure({
  appenders: {
    everything: { type: 'dateFile', filename: 'access.log' },
  },
  categories: {
    default: { appenders: ['everything'], level: 'debug' },
  },
});

const logger = log4js.getLogger('main');
app.use(log4js.connectLogger(logger, { level: 'auto' }));
app.get('/', async (req, res) => {
  if (!pg) {
    pg = new Client('postgresql://load_test:123456@localhost:5432/load_test');
    await pg.connect();
  }
  const result = await pg.query(`select * from material where type=$1`, [req.query.type]);
  res.send(result.rows);
});

app.listen(process.env.PORT, () => {
  console.log(`Example app started at port ${process.env.PORT}`);
});
