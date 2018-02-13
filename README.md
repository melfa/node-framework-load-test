# Performance comparison for NodeJS web and database frameworks (ORM)
Goal is to compare performance of modern typescript frameworks (routing-controllers, nestjs, typeorm, objection)
with fastest base performance (express, pg)

Web frameworks:
* express (comparison base)
* routing-controllers
* nestjs

Database frameworks (ORM):
* pg (comparison base)
* typeorm
* objection

Loggers:
* winston
* log4js-node

## tl;dr

Running 1 worker:
* base 530 rps (express+pg)
* routing-controllers -150 rps
* nestjs -30 rps
* typeorm -120 rps
* objection -80 rps
* winston -170 rps
* log4js-node -80 rps

Running 8-12 worker (16 cores CPU):
* base 1500 rps (express+pg)
* routing-controllers -280 rps
* nestjs -200 rps
* typeorm -190 rps
* objection -250 rps




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

## Results

### express+pg

Load profile: constant 10 rps, 1 NodeJS worker

Response times:
* 99% < 22 ms
* 98% < 10 ms
* 95% < 7 ms

Load profile: starting from 1 rps to 2000 rps during 5 minutes

* 1 worker — ~600 rps (report__zrniN.html)
* 1 worker, response time less than 500 ms - 530 rps (report_Z6Poxi.html)
* node cluster 15 workers — ~1350 rps (report_sTPdbT.html)
* nginx proxy_pass 10 workers — 3500 rps (report_GkdgM1.html)
* with response time less than 500ms — 1500-1600 rps (report_80tsxk.html, report_3tl8Hk.html)

### express+typeorm

Load profile: constant 10 rps, 1 NodeJS worker

Response times:
* 99% < 25 ms
* 98% < 16 ms
* 95% < 13 ms

Load profile: starting from 1 rps to 2000 rps during 5 minutes
* 1 worker, logging on — 220 rps (report_EL92ly.html)
* 1 worker, no logging — 250 rps

### express+objection

Load profile: constant 10 rps, 1 NodeJS worker

Response times:
* 99% < 16 ms
* 98% < 10 ms
* 95% < 8 ms

Load profile: starting from 1 rps to 2000 rps during 5 minutes
* 1 worker — 450 rps
* nginx proxy_pass 9 workers — 1250 rps (report_QKedSC.html)

### express+sequelize

Load profile: constant 10 rps, 1 NodeJS worker

Response times:
* 99% < 33 ms
* 98% < 14 ms
* 95% < 10 ms

Load profile: starting from 1 rps to 2000 rps during 5 minutes
* 1 worker — 250 rps (report_jfVTKk.html)
* get raw objects (raw: true), 1 worker — 450 rps

### routing-controllers+typeorm

Load profile: constant 10 rps, 1 NodeJS worker

Response times:
* 99% < 22 ms
* 98% < 17 ms
* 95% < 14 ms

Load profile: starting from 1 rps to 2000 rps during 5 minutes
* 1 worker — 260 rps (report_NJs9i2.html)
* get raw objects with query builder (getRawMany), 1 worker — 380 rps
* nginx proxy_pass 9 workers (getRawMany) — 1085 rps (report_phfaTJ.html)
* nginx proxy_pass 12 workers (getMany) — 1030 rps (report_9gO2xb.html)

### routing-controllers+pg

Load profile: starting from 1 rps to 2000 rps during 5 minutes

* 1 worker — 380 rps (report_hcBv3p.html)
* nginx proxy_pass 10 workers — 1220 rps (report_Hjc8TN.html)

### routing-controllers+objection

Load profile: starting from 1 rps to 2000 rps during 5 minutes
* 1 worker — 350 rps (report_W_quF4.html)
* nginx proxy_pass 9 workers — 1100 rps (report_OHPaMK.html)

### nestjs+pg

Load profile: starting from 1 rps to 2000 rps during 5 minutes
* 1 workers — 500 rps (report_Yivpne.html)
* nginx proxy_pass 10 workers — 1300 rps (report_UMCUAs.html, report_9gO2xb.html)

### nestjs+objection

Load profile: starting from 1 rps to 2000 rps during 5 minutes
* 1 workers — 360 rps (report_4PKlqd.html)
* nginx proxy_pass 12 workers — 1150 rps (report_SC4ZJ2.html)

### express+pg+winston

Load profile: starting from 1 rps to 500 rps during 5 minutes
* 1 worker, winston-daily-rotate-file — 360 rps (report_dk1nmj.html)
* 1 worker, winston.transports.File — 330 rps (report_8jVX9_.html)

### express+pg+log4js

Load profile: starting from 1 rps to 500 rps during 5 minutes
* 1 worker — 450 rps (report_CAFTEL.html, report_8v6JZT.html)


## Reference target machine

Proxmox virtual machine:
* 16 cores Intel Xeon CPU E5630
* 32 GB RAM
* OS Debian stretch

[Details](target.md)


## Requirements

Target machine:
* nginx 1.10.0
* NodeJS 6.9.1
* PostgresQL 9.5.5
* supervisor 3.3.1

Loader machine:
* yandex-tank 1.7.29 (https://github.com/yandex/yandex-tank)
* [yatank-online](https://github.com/yandex-load/yatank-online)


## Installation

### Target machine

Create database:
```sh
psql -c "create user load_test with password '123456'" postgres
psql -c "create database load_test owner load_test;" postgres
psql -f bootstrap.sql load_test 
```

Setup test application, for example `express-pg`:
```sh
rm /home/load-test/current-test
ln -s /home/load-test/node-framework-load-test/express-pg /home/load-test/current-test
cd /home/load-test/current-test
npm install
npm run compile

```

Setup supervisor:
```sh
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_1.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_2.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_3.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_4.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_5.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_6.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_7.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_8.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_9.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_10.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_11.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_12.conf /etc/supervisor/conf.d/
sudo service supervisor restart
```

Setup nginx:
```sh
cp nginx/nginx.conf /etc/nginx/
ln -s /home/load-test/node-framework-load-test/nginx/node-framework.conf /etc/nginx/sites-enabled/
sudo service nginx restart
```

### Loader machine

Run load test:
```sh
yandex-tank -c node-framework.ini
```
