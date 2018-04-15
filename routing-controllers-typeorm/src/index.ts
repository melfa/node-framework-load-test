import 'reflect-metadata';
import { createExpressServer, QueryParam, Controller, Get } from 'routing-controllers';
import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  createConnection,
  getRepository,
  OneToOne,
  JoinColumn,
} from 'typeorm';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
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

  @OneToOne(_ => Author)
  @JoinColumn()
  public author!: Author;
}

interface ArticleData {
  lead?: string;
  link: string;
  cover?: string;
}

@Controller()
export class TestController {
  private materialRepository = getRepository(Material);

  @Get('/')
  public async getAll(@QueryParam('type') type: string) {
    return await this.materialRepository.find({ type: type as any });
  }

  @Get('/join')
  public async join(@QueryParam('type') type: string) {
    return await this.materialRepository.createQueryBuilder('material')
      .innerJoinAndSelect('material.author', 'author')
      .where({ type: type as any })
      .getMany();
  }

}

const app = createExpressServer({ controllers: [TestController] });

createConnection({
  type: 'postgres',
  host: 'localhost',
  username: 'loadtest',
  password: '123456',
  database: 'loadtest',
  entities: [Material, Author],
  logging: false,
}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app started at port ${process.env.PORT}`);
  });
});
