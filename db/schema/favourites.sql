DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL
  , user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  , map_id INTEGER NOT NULL REFERENCES maps(id) ON DELETE CASCADE
);