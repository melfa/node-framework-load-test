CREATE TABLE material (
  id character varying NOT NULL,
  title character varying NOT NULL,
  "rubricId" character varying NOT NULL,
  type character varying NOT NULL,
  "materialData" json
);

INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('glass-of-water', 'Выпивайте стакан воды за 15 минут перед каждым приемом пищи', 'water', 'habit', NULL);
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('eat-slowly', 'Ешьте медленно', 'mindfulness', 'habit', NULL);
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('stop-on-80', 'Останавливайтесь, когда чувствуете сытость на 80%', 'mindfulness', 'habit', NULL);
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('protein', 'Ешьте нежирный белковый продукт в каждый прием пищи, и начинайте прием с него', 'proteins', 'habit', NULL);
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('fastfood-1', 'Замените фастфуд (блюда, приготовленные на вок, картофель фри, гамбургеры, наггетсы, стрипсы) на порцию нежирного мяса, птицы или рыбы с гарниром из крупы или овощным салатом', 'fastFood', 'habit', NULL);
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('fastfood-2', 'Замените колбасу/ветчину на кусочек запеченной индейки или телятины', 'fastFood', 'habit', NULL);
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('fats-1', 'Оставьте употребление сыра 2 раза в неделю (1 порцию), стараясь выбирать нежирные сорта, в остальное время замените сыр на творог с ягодами или фруктами', 'fats', 'habit', NULL);
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('proteins-1', 'Важнейшие источники белка, без которых не может обходиться ни один здоровый рацион', 'proteins', 'article', '{"link":"https://lifehacker.ru/2015/09/23/poleznye-istochniki-belka/"}');
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('proteins-2', 'Об источниках растительного белка', 'proteins', 'article', '{"lead":"(спойлер: вегетарианцы могут спать спокойно!)","link":"http://vitaportal.ru/zdorovoe-pitanie/12-bogatyh-belkami-produktov-rastitelnogo-proishozhdeniya.html"}');
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('proteins-4', 'Сколько белка необходимо употреблять?', 'proteins', 'article', '{"link":"https://lifehacker.ru/2017/06/08/how-much-protein-you-should-eat/"}');
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('proteins-5', 'Полезные рецепты на выходные', 'proteins', 'article', '{"lead":"протеиновые десерты","link":"https://dailyfit.ru/pitanie-i-dieta/7-poleznyx-proinovyx-receptov/"}');
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('proteins-6', 'Как приготовить мясо и птицу на несколько дней вперед?', 'proteins', 'article', '{"lead":"Учимся запекать в духовке","link":"https://www.edimdoma.ru/kulinarnaya_shkola/posts/19972-kak-vkusno-zapech-v-duhovke-blyuda"}');
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('random-1', 'Я начал заниматься фитнесом и потолстел', 'random', 'article', '{"link":"http://mybalance.me/ya-nachal-zanimatsya-fitnesom-i-potolstel"}');
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('random-2', 'Индивидуальные пульсовые зоны', 'random', 'article', '{"link":"http://mybalance.me/pulsovye-zony"}');
INSERT INTO material (id, title, "rubricId", type, "materialData") VALUES ('random-3', 'Успеть за 10 минут', 'random', 'article', '{"link":"http://mybalance.me/uspet-za-10-minut"}');
