/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { addFavouriteMap, getFavouriteMaps} = require('../lib/userQueries');


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
  //creating new map
  // router.post('/new', (req, res) => {
  //     console.log(req.query);
  //     res.render("createMap", req.query);

  // });

  router.get("/new", (req, res) => {
    res.render("createMap", req.query);

// GET route to the User Id
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  getFavouriteMaps(userId, db)
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
  getFavouriteMaps(userId, db)
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
  addFavouriteMap(userId, mapId, db)
    .then(() => {
      return getFavouriteMaps(userId, db);
    })
    .then(result => res.json(result))
    .catch(err => {
      res.status(500)
        .json({error: err.message});
    });
});

    router.post("/new", (req, res) => {
      return result = db
      .query(`INSERT INTO maps (title, description, location)
      VALUES ($1, $2, $3)
      RETURNING * ;`, [req.body.title, req.body.description, req.body.city])
      .then(result => {
        if (result.rows[0]) {
          console.log(result);
          let id = result.rows[0].id
          res.redirect(`/new/${id}`);
          return result.rows[0];
        } else {
          return null;
        }
      })
      .catch(error => console.log(error.message));
    })






  return router;
});
})};

// addFavouriteMap(3, 3)
//   .then(result => {
//     console.log(">>>>>>>>>>>>>>>>", result)
//   })
