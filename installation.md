# Installation

## Requirements

Target machine:
* OS Debian Stretch
* nginx 1.10.3
* NodeJS 8.11.1
* PostgresQL 9.6.7
* supervisor 3.3.1

Loader machine:
* OS Ubuntu 16.04
* yandex-tank 1.7.29 (https://github.com/yandex/yandex-tank)
* [Yandex Overload](http://overload.yandex.net) token

## Target machine

Create user `loadtest`.
Upload project to /home/loadtest/node-framework-test

Create database:
```sh
psql -c "create user loadtest with password '123456'" postgres
psql -c "create database loadtest owner loadtest;" postgres
cd /home/loadtest/node-framework-load-test
psql -f bootstrap.sql loadtest 
```

Setup supervisor:
```sh
ln -s /home/loadtest/node-framework-load-test/environment/supervisor/node-framework_1.conf /etc/supervisor/conf.d/
ln -s /home/loadtest/node-framework-load-test/environment/supervisor/node-framework_2.conf /etc/supervisor/conf.d/
ln -s /home/loadtest/node-framework-load-test/environment/supervisor/node-framework_3.conf /etc/supervisor/conf.d/
ln -s /home/loadtest/node-framework-load-test/environment/supervisor/node-framework_4.conf /etc/supervisor/conf.d/
sudo service supervisor restart
```

Setup nginx:
```sh
cp /home/loadtest/node-framework-load-test/environment/nginx/nginx.conf /etc/nginx/
rm /etc/nginx/sites-enabled/default
ln -s /home/loadtest/node-framework-load-test/environment/nginx/node-framework.conf /etc/nginx/sites-enabled/
sudo service nginx restart
```

Setup test application (or switch between applications), for example `express-pg`:
```sh
rm /home/loadtest/current-test
ln -s /home/loadtest/node-framework-load-test/express-pg /home/loadtest/current-test
cd /home/loadtest/current-test
npm install
npm run build
sudo service supervisor restart
```

### Performance tuning

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

[Tune for performance](http://yandextank.readthedocs.io/en/latest/generator_tuning.html#tuning)

Create user `loadtest`.
Upload project to /home/loadtest/node-framework-test.

Change in `environment/yandex-tank/node-framework.yaml` phantom => address to IP-address or hostname
of your target machine. Set uris to `/?type=article` to test single table select or `/join?type=article`
to test two tables join.

Get overload.yandex.net token and place in /home/loadtest/environment/yandex-tank/token.txt.

Run load test:
```sh
yandex-tank -c /home/loadtest/environment/yandex-tank/node-framework.yaml
```
