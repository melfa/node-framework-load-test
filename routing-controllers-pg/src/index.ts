import 'reflect-metadata';
import { Client } from 'pg';
import { createExpressServer, QueryParam, Controller, Get } from 'routing-controllers';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const pg = new Client('postgresql://loadtest:123456@localhost:5432/loadtest');

@Controller()
export class TestController {

  @Get('/')
  public async getAll(@QueryParam('type') type: string) {
    const result = await pg.query(`select * from material where type=$1`, [type]);
    return result.rows;
  }

  @Get('/join')
  public async join(@QueryParam('type') type: string) {
    const result = await pg.query(
      `select * from material join author on material."authorId" = author.id where type=$1`,
      [type],
    );
    return result.rows;
  }

}

const app = createExpressServer({ controllers: [TestController] });

pg.connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app started at port ${process.env.PORT}`);
  });
});
