-- Users table seeds here (Example)
INSERT INTO users (name, email, password, description)
VALUES('Abraham', 'AB@gmail.com', 'Ilovepizza', 'description');
INSERT INTO users (name, email, password, description)
VALUES('Vega', 'vega@gmail.com', 'cheese', 'description');
INSERT INTO users (name, email, password, description)
VALUES('Ham', 'jpan@gmail.com', 'hamcheese', 'description');
INSERT INTO users (name, email, password, description)
VALUES('Pepsi', 'pepsi@gmail.com', 'pepsiisbetterthancoke', 'description');

INSERT INTO maps (title, description, user_id, date_created) VALUES ('This is a title', 'Description', 1, '2021-03-02');
INSERT INTO maps (title, description, user_id, date_created) VALUES ('This is another title', 'Description', 3, '2022-02-02');
INSERT INTO maps (title, description, user_id, date_created) VALUES ('This is a different title', 'Description', 2, '2021-02-02');

INSERT INTO places (title, description) VALUES ('Yes Resto', 'Description');
INSERT INTO places (title, description) VALUES ('No Resto', 'Description');
INSERT INTO places (title, description) VALUES ('Maybe Resto', 'Description');

-- INSERT INTO contributions(user_id, map_id) VALUES (1, 2);
-- INSERT INTO contributions(user_id, map_id) VALUES (2, 3);
-- INSERT INTO contributions(user_id, map_id) VALUES (3, 4);

-- INSERT INTO favorites (user_id, map_id) VALUES (2, 3);
-- INSERT INTO favorites (user_id, map_id) VALUES (3, 2);
-- INSERT INTO favorites (user_id, map_id) VALUES (1, 3);

-- INSERT INTO maps_places (map_id, place_id) VALUES (1, 3);
-- INSERT INTO maps_places (map_id, place_id) VALUES (2, 2);
-- INSERT INTO maps_places (map_id, place_id) VALUES (2, 3);
-- INSERT INTO maps_places (map_id, place_id) VALUES (3, 3);

-- command line to import --
-- \i seeds/01_users.sql --
-- \i /db/schema/01_users.sql
