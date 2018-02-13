import 'reflect-metadata';
import { createExpressServer, QueryParam, Controller, Get } from 'routing-controllers';
import { Column, Entity, PrimaryColumn, createConnection, getRepository } from 'typeorm';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}


enum MaterialType {
  Article = 'article',
  Habit = 'habit',
  Video = 'video',
}

@Entity()
class Material {
  @PrimaryColumn()
  public id!: string;

  @PrimaryColumn()
  public type!: MaterialType;

  @Column()
  public title!: string;

  @Column()
  public rubricId!: string;

  @Column('json')
  public materialData!: ArticleData;
}

interface ArticleData {
  lead?: string;
  link: string;
  cover?: string;
}

@Controller()
export class TestController {
  private repository = getRepository(Material);

  @Get('/')
  public async getAll(@QueryParam('type') type: string) {
    // return await this.repository.find({ type: type as any });
    return await this.repository.createQueryBuilder('material')
      .where({ type: type as any })
      .getMany();
  }

}

const app = createExpressServer({ controllers: [TestController] });

createConnection({
  type: 'postgres',
  host: 'localhost',
  username: 'load_test',
  password: '123456',
  database: 'load_test',
  entities: [Material],
  logging: false,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app started at port ${process.env.PORT}`);
  });
});
