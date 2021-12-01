// const dbParams = require('./db');
// const { Pool } = require("pg");
// // const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);
// db.connect();


const addFavouriteMap = function(userId, mapId, db) {
  return db
    .query(`
    INSERT into favourites (user_id, map_id) VALUES ($1, $2)
    RETURNING *;`, [userId, mapId])
    .then (res => res.rows);
};

const getFavouriteMaps = function (userId, db) {
  const queryString = `SELECT maps.* FROM favourites
                       JOIN maps ON map_id = maps.id
                       JOIN users ON favourites.user_id = users.id
                       WHERE favourites.user_id = $1

`;

  return db
    .query(queryString, [userId])
    .then(res => res.rows);
};

module.exports = {addFavouriteMap, getFavouriteMaps}
