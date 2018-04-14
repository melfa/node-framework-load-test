# Installation

## Requirements

Target machine:
* nginx 1.10.0
* NodeJS 6.9.1
* PostgresQL 9.5.5
* supervisor 3.3.1

Loader machine:
* yandex-tank 1.7.29 (https://github.com/yandex/yandex-tank)
* (overload.yandex.net) token

## Target machine

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
npm run build
```

Setup supervisor:
```sh
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_1.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_2.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_3.conf /etc/supervisor/conf.d/
ln -s /home/load-test/node-framework-load-test/supervisor/node-framework_4.conf /etc/supervisor/conf.d/
sudo service supervisor restart
```

Setup nginx:
```sh
cp nginx/nginx.conf /etc/nginx/
ln -s /home/load-test/node-framework-load-test/nginx/node-framework.conf /etc/nginx/sites-enabled/
sudo service nginx restart
```

### Performance-related tuning

/etc/sysctl.conf:
```
fs.file-max=70000
net.ipv4.tcp_tw_reuse=0
vm.vfs_cache_pressure=1000
net.core.somaxconn=4096
```
then run `sysctl -p`

/etc/security/limits.conf
```
www-data       hard    nofile  30000
```


## Loader machine

Run load test:
```sh
yandex-tank -c node-framework.yaml
```
