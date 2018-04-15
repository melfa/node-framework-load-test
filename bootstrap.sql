CREATE TABLE author (
  id serial primary key,
  status varchar not null,
  "firstName" varchar not null,
  "lastName" varchar not null,
  email varchar not null unique,
  "creationTime" timestamptz not null,
  "updateTime" timestamptz not null
);

insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Jonathan', 'Carlson', 'carlson@example.com', '2018-01-01 14:00', '2018-01-01 14:00');
insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Dmitry', 'Kasyanov', 'kasyanov@example.com', '2018-01-02 14:00', '2018-01-02 14:00');
insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Pavel', 'Filippov', 'filippov@example.com', '2018-01-03 14:00', '2018-01-03 14:00');
insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Alexey', 'Makhotkin', 'makhotkin@example.com', '2018-01-04 14:00', '2018-01-04 14:00');
insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Roman', 'Pyatakov', 'pyatakov@example.com', '2018-01-05 14:00', '2018-01-05 16:00');
insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Vyacheslav', 'Trebushnoi', 'trebushnoi@example.com', '2018-01-06 14:00', '2018-01-06 21:00');
insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Aleksey', 'Pyshonkin', 'pyshonkin@example.com', '2018-01-01 14:00', '2018-01-01 14:55');
insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Dmitry', 'Medvedev', 'medvedev@example.com', '2018-01-07 14:00', '2018-01-10 10:01');
insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Andrey', 'Vorobyev', 'vorobyev@example.com', '2018-01-07 14:00', '2018-01-08 15:07');
insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Nikita', 'Gubchenko', 'gubchenko@example.com', '2018-01-08 14:00', '2018-01-08 14:00');
insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Pavel', 'Slotinsky', 'slotinsky@example.com', '2018-08-01 14:00', '2018-08-01 14:00');
insert into author (status, "firstName", "lastName", email, "creationTime", "updateTime") values ('active', 'Sergey', 'Samokhov', 'samokhov@example.com', '2018-04-01 14:00', '2018-05-01 11:59');

CREATE TABLE material (
  id character varying NOT NULL,
  title character varying NOT NULL,
  "rubricId" character varying NOT NULL,
  type character varying NOT NULL,
  "materialData" json,
  "authorId" integer not null
);

INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('glass-of-water', 'Выпивайте стакан воды за 15 минут перед каждым приемом пищи', 'water', 'habit', NULL, 1);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('eat-slowly', 'Ешьте медленно', 'mindfulness', 'habit', NULL, 2);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('stop-on-80', 'Останавливайтесь, когда чувствуете сытость на 80%', 'mindfulness', 'habit', NULL, 3);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('protein', 'Ешьте нежирный белковый продукт в каждый прием пищи, и начинайте прием с него', 'proteins', 'habit', NULL, 4);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('fastfood-1', 'Замените фастфуд (блюда, приготовленные на вок, картофель фри, гамбургеры, наггетсы, стрипсы) на порцию нежирного мяса, птицы или рыбы с гарниром из крупы или овощным салатом', 'fastFood', 'habit', NULL, 5);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('fastfood-2', 'Замените колбасу/ветчину на кусочек запеченной индейки или телятины', 'fastFood', 'habit', NULL, 6);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('fats-1', 'Оставьте употребление сыра 2 раза в неделю (1 порцию), стараясь выбирать нежирные сорта, в остальное время замените сыр на творог с ягодами или фруктами', 'fats', 'habit', NULL, 7);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('proteins-1', 'Важнейшие источники белка, без которых не может обходиться ни один здоровый рацион', 'proteins', 'article', '{"link":"https://lifehacker.ru/2015/09/23/poleznye-istochniki-belka/"}', 8);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('proteins-2', 'Об источниках растительного белка', 'proteins', 'article', '{"lead":"(спойлер: вегетарианцы могут спать спокойно!)","link":"http://vitaportal.ru/zdorovoe-pitanie/12-bogatyh-belkami-produktov-rastitelnogo-proishozhdeniya.html"}', 9);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('proteins-4', 'Сколько белка необходимо употреблять?', 'proteins', 'article', '{"link":"https://lifehacker.ru/2017/06/08/how-much-protein-you-should-eat/"}', 10);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('proteins-5', 'Полезные рецепты на выходные', 'proteins', 'article', '{"lead":"протеиновые десерты","link":"https://dailyfit.ru/pitanie-i-dieta/7-poleznyx-proinovyx-receptov/"}', 11);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('proteins-6', 'Как приготовить мясо и птицу на несколько дней вперед?', 'proteins', 'article', '{"lead":"Учимся запекать в духовке","link":"https://www.edimdoma.ru/kulinarnaya_shkola/posts/19972-kak-vkusno-zapech-v-duhovke-blyuda"}', 12);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('random-1', 'Я начал заниматься фитнесом и потолстел', 'random', 'article', '{"link":"http://mybalance.me/ya-nachal-zanimatsya-fitnesom-i-potolstel"}', 1);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('random-2', 'Индивидуальные пульсовые зоны', 'random', 'article', '{"link":"http://mybalance.me/pulsovye-zony"}', 2);
INSERT INTO material (id, title, "rubricId", type, "materialData", "authorId") VALUES ('random-3', 'Успеть за 10 минут', 'random', 'article', '{"link":"http://mybalance.me/uspet-za-10-minut"}', 3);

