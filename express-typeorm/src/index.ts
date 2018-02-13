import './bootstrap';
import * as express from 'express';
import {
  Column,
  Entity,
  PrimaryColumn,
  createConnection,
  getRepository,
  Repository,
} from 'typeorm';

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

const app = express();
let repository: Repository<Material>;

app.get('/', async (req, res) => {
  const articles = await repository.createQueryBuilder('material')
    .where({ type: req.query.type as any })
    .getMany();
  res.send(articles);
});

createConnection({
  type: 'postgres',
  host: 'localhost',
  username: 'load_test',
  password: '123456',
  database: 'load_test',
  entities: [Material],
  logging: false,
}).then(() => {
  repository = getRepository(Material);
  app.listen(process.env.PORT, () => {
    console.log(`Example app started at port ${process.env.PORT}`);
  });
});
