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

export enum Status {
  active = 'active',
  deleted = 'deleted',
}

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column('varchar')
  public status!: Status;

  @Column('varchar')
  public firstName!: string;

  @Column('varchar')
  public lastName!: string;

  @Column('varchar')
  public email!: string;

  @Column('timestamptz')
  public creationTime!: Date;

  @Column('timestamptz')
  public updateTime!: Date;
}


export enum MaterialType {
  Article = 'article',
  Habit = 'habit',
  Video = 'video',
}

@Entity()
export class Material {
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
  username: 'loadtest',
  password: '123456',
  database: 'loadtest',
  entities: [Material, Author],
  logging: false,
}).then(() => {
  repository = getRepository(Material);
  app.listen(process.env.PORT, () => {
    console.log(`Example app started at port ${process.env.PORT}`);
  });
});
