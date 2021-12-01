-- Users table seeds here (Example)
INSERT INTO users (name, email, password, description)
VALUES('Abraham', 'AB@gmail.com', 'Ilovepizza', 'description');
INSERT INTO users (name, email, password, description)
VALUES('Vega', 'vega@gmail.com', 'cheese', 'description');
INSERT INTO users (name, email, password, description)
VALUES('Ham', 'jpan@gmail.com', 'hamcheese', 'description');
INSERT INTO users (name, email, password, description)
VALUES('Pepsi', 'pepsi@gmail.com', 'pepsiisbetterthancoke', 'description');

INSERT INTO maps (title, description, location, user_id) VALUES ('This is a title', 'Description','tokyo', 1);
INSERT INTO maps (title, description, location, user_id) VALUES ('This is another title', 'Description','vancouver', 1);
INSERT INTO maps (title, description, location, user_id) VALUES ('This is a different title', 'Description','toronto', 2);

INSERT INTO marker (title, description, map_id, lng, lat, place_id) VALUES ('Yes Resto', 'Description', 3, -79.347015, 43.651070, 'placeholderID');
INSERT INTO marker (title, description, map_id, lng, lat, place_id) VALUES ('No Resto', 'Description', 2, -79.347015, 43.651070, 'placeholderID');
INSERT INTO marker (title, description, map_id, lng, lat, place_id) VALUES ('Maybe Resto', 'Description', 1, -79.347015, 43.651070, 'placeholderID');

INSERT INTO contributions(user_id, map_id) VALUES (1, 2);
INSERT INTO contributions(user_id, map_id) VALUES (2, 3);
INSERT INTO contributions(user_id, map_id) VALUES (3, 2);

INSERT INTO favourites (user_id, map_id) VALUES (2, 3);
INSERT INTO favourites (user_id, map_id) VALUES (3, 2);
INSERT INTO favourites (user_id, map_id) VALUES (1, 3);
