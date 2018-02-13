import * as express from 'express';
import * as Sequelize from 'sequelize';

if (!process.env.PORT) {
  throw new Error('Environment variable PORT is not set');
}

const app = express();

const db = new Sequelize('load_test', 'load_test', '123456', {
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

app.get('/', async ({}, res) => {
  const result = await Material.findAll({ where: { type: 'article' }, raw: true });
  res.send(result);
});


app.listen(process.env.PORT, () => {
  console.log(`Example app started at port ${process.env.PORT}`);
});
