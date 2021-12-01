DROP TABLE IF EXISTS location_marker CASCADE;

CREATE TABLE location_marker (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  maps_id INTEGER REFERENCES map(id) ON DELETE CASCADE,
  long INTEGER NOT NULL,
  lat INTEGER NOT NULL,
  place_id VARCHAR(255) NOT NULL
);


INSERT INTO location_marker (title, map_id, long,lat, place_id)
VALUES ($1, $2, $3, $4, $5);
