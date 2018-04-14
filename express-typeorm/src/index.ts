import * as express from 'express';
import {
  Column,
  Entity,
  PrimaryColumn,
  createConnection,
  getRepository,
  Repository,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
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
  @PrimaryColumn('varchar')
  public id!: string;

  @PrimaryColumn('varchar')
  public type!: MaterialType;

  @Column('varchar')
  public title!: string;

  @Column('varchar')
  public rubricId!: string;

  @Column('json')
  public materialData!: ArticleData;

  @OneToOne(_ => Author)
  @JoinColumn()
  public author!: Author;
}

interface ArticleData {
  lead?: string;
  link: string;
  cover?: string;
}

enum Status {
  active = 'active',
  deleted = 'deleted',
}

@Entity()
class Author {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public status!: Status;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public email!: string;

  @Column()
  public creationTime!: Date;

  @Column()
  public updateTime!: Date;
}


const app = express();
let repository: Repository<Material>;

app.get('/', async (req, res) => {
  const articles = await repository.createQueryBuilder('material')
    .where({ type: req.query.type as any })
    .getMany();
  res.send(articles);
});

app.get('/join', async (req, res) => {
  const articles = await repository.createQueryBuilder('material')
    .innerJoinAndSelect('material.author', 'author')
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
