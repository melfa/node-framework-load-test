# Performance comparison for NodeJS web and database frameworks (ORM)

**This branch is about node 8. For node 6 see node6 branch.**

Goal is to compare performance of modern typescript frameworks (routing-controllers, nestjs, typeorm, objection)
with fastest base performance (express, pg)

Web frameworks:
* express 4.16.3 (comparison base)
* routing-controllers 0.7.7
* nestjs 4.6.6

Database frameworks (ORM):
* pg 7.4.1 (comparison base)
* typeorm 0.1.20
* objection 1.1.5

Loggers:
* winston 2.4.1
* log4js-node 2.5.3

## tl;dr

Running 1 worker:
* base TBD rps (express+pg), +join -TBD rps loss
* routing-controllers -TBD rps loss
* nestjs -TBD rps loss
* typeorm -TBD rps loss, +join -TBD rps loss
* objection -TBD rps loss, +join -TBD rps loss
* winston -TBD rps loss
* log4js-node -TBD rps loss

Running 4 worker (4 cores CPU):
* base TBD rps (express+pg)
* routing-controllers -TBD rps loss
* nestjs -TBD rps loss
* typeorm -TBD rps loss
* objection -TBD rps loss




## Method

HTTP request processing chain:
Nginx proxy_pass -> NodeJS workers -> PostgreSQL

Run simple SQL query to one table returning about 10 rows:

```typescript
// pg
pg.query(`select * from material where type=$1`, [req.query.type]);
// typeorm
repository.createQueryBuilder('material').where({ type: type }).getMany();
// objection
Material.query().where('type', req.query.type)
```

Join two tables:
```typescript
// pg
pg.query(`select * from material join author on material."authorId" = author.id where type=$1`, [req.query.type]);
// typeorm
repository.createQueryBuilder('material').innerJoinAndSelect('material.author', 'author').where({ type: type }).getMany();
// objection
Material.query().eager('author').where('type', req.query.type)
```

## Results

### express+pg

### express+pg-native

### express+typeorm

### express+objection

### express+sequelize

### routing-controllers+typeorm

### routing-controllers+pg

### routing-controllers+objection

### nestjs+pg

### nestjs+objection

### express+pg+winston

### express+pg+log4js


## Reference target machine

vscale.io:
* 4 cores Intel Xeon CPU E5-2670 v3 @ 2.30GHz
* 8 GB RAM
* OS Debian Stretch
* SSD

[Installation](installation.md)
[Details](target.md)
