/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { addFavouriteMap, getFavouriteMaps} = require('../db/queries/users-queries');

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/profile", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;

};

//GET route to the User Id
router.get("/:id", (req, res) => {
  const userId = req.params,id;
  getFavouriteMaps(userId)
  .then(maps => res.json(maps))
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
})

//GET Route to user's favourites

router.get(":/id/favourites", (req, res) => {
  const userId = req.params.id;
  getFavouriteMaps(userId)
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({error: err.message});
  });
});

router.post("/:id/favourites", (req, res) => {
  const userId = req.params.id;
  const mapId = req.body.mapId
  addFavouriteMap(userId, mapId)
    .then(() => {
      return getFavouriteMaps(userId);
    })
    .then(result => res.json(result))
    .catch(err => {
      res.status(500)
        .json({error: err.message});
    });
});
