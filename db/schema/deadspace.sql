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


