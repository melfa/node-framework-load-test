import * as express from 'express';
import * as Sequelize from 'sequelize';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const app = express();

const db = new Sequelize('loadtest', 'loadtest', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});


const Material = db.define(
  'material',
  {
    id: { type: Sequelize.STRING, primaryKey: true },
    type: Sequelize.STRING,
    title: Sequelize.STRING,
    rubricId: Sequelize.STRING,
    materialData: Sequelize.JSON,
  },
  {
    timestamps: false, tableName: 'material',
  },
);

const Author = db.define(
  'author',
  {
    id: { type: Sequelize.NUMBER, primaryKey: true, autoIncrement: true },
    status: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    creationTime: Sequelize.DATE,
    updateTime: Sequelize.DATE,
  },
  {
    timestamps: false, tableName: 'author',
  },
);

Material.hasOne(Author);

app.get('/', async ({}, res) => {
  const result = await Material.findAll({ where: { type: 'article' } });
  res.send(result);
});

app.get('/join', async ({}, res) => {
  const result = await Material.findAll({
    where: { type: 'article' },
    include: [Author],
  });
  res.send(result);
});

app.listen(process.env.PORT, () => {
  console.log(`Example app started at port ${process.env.PORT}`);
});
