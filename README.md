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

Running 4 worker (4 cores CPU)

Base (express+pg) performance 4560 RPS (Requests per second)

Framework | Performance loss, % | Performance loss, RPS
--- | --- | ---
join two tables | 27% | 1265
routing-controllers | 23% | 1060
nestjs | |
typeorm | 40% | 1820
typeorm, join | 65% | 2970
objection | |
winston | |
log4js-node | |




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

Load profile: starting from 1 rps to 6000 rps during 5 minutes

4 nodejs workers

* select from one table - 4560 rps [report_vaBP7p.html](http://htmlpreview.github.io/?https://github.com/melfa/node-framework-load-test/blob/node8/reports/report_vaBP7p.html)
* join two tables - 3295 rps [report_tWRJRk.html](http://htmlpreview.github.io/?https://github.com/melfa/node-framework-load-test/blob/node8/reports/report_tWRJRk.html)


### express+pg-native

### express+typeorm

Load profile: starting from 1 rps to 6000 rps during 5 minutes

4 nodejs workers

* select from one table - 2740 rps [report_d2sB0l.html](http://htmlpreview.github.io/?https://github.com/melfa/node-framework-load-test/blob/node8/reports/report_d2sB0l.html)
* join two tables - 1590 rps [report_Sm20cX.html](http://htmlpreview.github.io/?https://github.com/melfa/node-framework-load-test/blob/node8/reports/report_Sm20cX.html)


### express+objection

### express+sequelize

### routing-controllers+typeorm

Load profile: starting from 1 rps to 6000 rps during 5 minutes

4 nodejs workers

* select from one table - 2360 rps [report_g1EPyS.html](http://htmlpreview.github.io/?https://github.com/melfa/node-framework-load-test/blob/node8/reports/report_g1EPyS.html)
* join two tables - 1300 rps [report_8bzn1w.html](http://htmlpreview.github.io/?https://github.com/melfa/node-framework-load-test/blob/node8/reports/report_8bzn1w.html)

### routing-controllers+pg

Load profile: starting from 1 rps to 6000 rps during 5 minutes

4 nodejs workers

* select from one table - 3500 rps [report_n3AaKi.html](http://htmlpreview.github.io/?https://github.com/melfa/node-framework-load-test/blob/node8/reports/report_n3AaKi.html)
* join two tables - 2550 rps [report_HwpDjZ.html](http://htmlpreview.github.io/?https://github.com/melfa/node-framework-load-test/blob/node8/reports/report_HwpDjZ.html)

### routing-controllers+objection

### nestjs+pg

### nestjs+objection

### express+pg+winston

### express+pg+log4js


## Reference target machine

Amazon EC2 instance type c5.xlarge:
* 4 cores Intel Xeon Platinum 8124M CPU @ 3.00GHz
* 8 GB RAM
* OS Debian Stretch
* SSD

[Installation instructions](installation.md)

[Target details](target.md)
