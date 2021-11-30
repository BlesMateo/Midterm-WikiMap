const db = require('../..lib/db');

const addFavouriteMap = function(userId, mapId) {
  return db
    .query(`
    INSERT into favourites (user_id, map_id) VALUES ($1, $2)
    RETURNING *;`, [userId, mapId])
    .then (res => res.rows);
};

const getFavouriteMaps = function (userId) {
  const queryString = `SELECT maps.* FROM favourites
                       JOIN maps ON map_id = maps.id
                       JOIN users ON favourites.user_id = users.id
                       WHERE favourites.user_id = $1

`;

  return db
    .query(queryString, [userId])
    .then(res => res.rows);
};
