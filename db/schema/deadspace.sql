CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  description TEXT
);

INSERT INTO users (name, email, password, description)
VALUES('Abraham', 'AB@gmail.com', 'Ilovepizza', 'description');
INSERT INTO users (name, email, password, description)
VALUES('Vega', 'vega@gmail.com', 'cheese', 'description');

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO maps (title, description, location, user_id) VALUES ('is a title', 'Description','London', 1);
INSERT INTO maps (title, description, location, user_id) VALUES ('This is cheese', 'Description','Toronto', 2);
INSERT INTO maps (title, description, location, user_id) VALUES ('is a title', 'Description','London', 4);
INSERT INTO maps (title, description, location, user_id) VALUES ('This is cheese', 'Description','Toronto', 5);
-- INSERT INTO maps (title, description, location, user_id) VALUES ('This is happy', 'Description','UK', 3);

CREATE TABLE marker (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  maps_id INTEGER REFERENCES map(id) ON DELETE CASCADE,
  lng DECIMAL  NOT NULL,
  lat DECIMAL NOT NULL,
  place_id VARCHAR(255) NOT NULL
);

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);


INSERT INTO users (name, email, password, description)
VALUES('James', 'JC@gmail.com', 'Ilovepizza', 'description');
INSERT INTO users (name, email, password, description)
VALUES('Vega', 'vega@gmail.com', 'password', 'description');
INSERT INTO users (name, email, password, description)
VALUES('John', 'jpan@gmail.com', 'password', 'description');
INSERT INTO users (name, email, password, description)
VALUES('Shane', 'shanei@gmail.com', 'password', 'description');

INSERT INTO maps (title, description, location, user_id) VALUES ('Best Picnic Grounds', 'Description','Toronto', 1);
INSERT INTO maps (title, description, location, user_id) VALUES ('Dog Parks', 'Description','Toronto', 1);
INSERT INTO maps (title, description, location, user_id) VALUES ('Locations of Movie Scenes', 'Description','Vancouver', 3);
INSERT INTO maps (title, description, location, user_id) VALUES ('Best Places to Eat Around Town', 'Description','Toronto', 1);
INSERT INTO maps (title, description, location, user_id) VALUES ('Must Go To K-BBQ Spots', 'Description','Vancouver', 4);
INSERT INTO maps (title, description, location, user_id) VALUES ('Best Hiking Spots in Toronto!!', 'Description','Toronto', 2);


INSERT INTO marker (title, description, map_id, lng, lat, place_id) VALUES ('Yes Resto', 'Description', 3, -79.347015, 43.651070, 'placeholderID');
INSERT INTO marker (title, description, map_id, lng, lat, place_id) VALUES ('Great Lakes Waterfront Trail', 'Description', 2, -79.15169729807835, 4-79.15169729807835, 'placeholderID');
INSERT INTO marker (title, description, map_id, lng, lat, place_id) VALUES ('Evergreen Brick Works', 'Description', 1, -79.3645369087173, -79.3645369087173, 'placeholderID');
INSERT INTO marker (title, description, map_id, lng, lat, place_id) VALUES ('No Resto', 'Description', 2, -79.347015, 43.651070, 'placeholderID');
INSERT INTO marker (title, description, map_id, lng, lat, place_id) VALUES ('Burgers n Fries Forever', 'Description', 1, -79.39018483131264, 43.649458679470904, 'placeholderID');


INSERT INTO contributions(user_id, map_id) VALUES (1, 2);
INSERT INTO contributions(user_id, map_id) VALUES (2, 3);
INSERT INTO contributions(user_id, map_id) VALUES (3, 2);
INSERT INTO contributions(user_id, map_id) VALUES (1, 3);
INSERT INTO contributions(user_id, map_id) VALUES (2, 3);
INSERT INTO contributions(user_id, map_id) VALUES (1, 1);

INSERT INTO favourites (user_id, map_id) VALUES (2, 3);
INSERT INTO favourites (user_id, map_id) VALUES (3, 2);
INSERT INTO favourites (user_id, map_id) VALUES (1, 3);
INSERT INTO favourites (user_id, map_id) VALUES (3, 2);
INSERT INTO favourites (user_id, map_id) VALUES (1, 3);
