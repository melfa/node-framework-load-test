import * as path from 'path';
import * as express from 'express';
import { Client } from 'pg';
import * as winston from 'winston';
import { logger as expressLogger } from 'express-winston';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const app = express();
let pg: Client;

app.use(expressLogger({
  transports: [
    new winstonDailyRotateFile({
    // new winston.transports.File({
      filename: path.resolve(__dirname, '../access.log'),
      json: false,
    }),
  ],
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}',
  colorize: false,
}));

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
