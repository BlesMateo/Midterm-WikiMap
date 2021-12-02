/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { addFavouriteMap, getFavouriteMaps } = require('../lib/userQueries');


module.exports = (db) => {

  //TO BE REVIEWED - ADJUST TO MAKE A HOMEPAGE
  router.get("/", (req, res) => {
    // const templateVars =  { mapId: req.params.mapId }
    console.log("-------------------")
    return db
      .query(`SELECT title FROM maps
              LIMIT 3`)
      .then(result => {
        console.log("==============", result.rows)
        if (result.rows[0]) {
          let templateVars = { list0: result.rows[0].title, list1: result.rows[1].title }
          res.render("mapList", templateVars)
          return result.rows[0];
        } else {
          return null;
        }
      })
      .catch(error => console.log(error.message));
  });

  //Login Route
  router.get("/login", (req, res) => {
    const uLogin = req.session.user;
    console.log(uLogin);
    res.render("login", { uLogin });
  });

  //Register route
  router.get("/register", (req, res) => {
    // getUserByEmail("vega@gmail.com", db);
    const uLogin = req.session.user;
    res.render("register", { uLogin });
  });

  // // GET route to the User Id
  // router.get("/:id", (req, res) => {
  //   const userId = req.params.id;
  //   getFavouriteMaps(userId, db)
  //     .then(maps => res.json(maps))
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // })

  //GET Route to user's favourites
  router.get("/favourites/:id", (req, res) => {
    const userId = req.params.id;
    getFavouriteMaps(userId, db)
      .then(maps => res.json(maps))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // This route is to be impletmented and tested/ route should be /favourites/:id
  router.post("/favourites/:id", (req, res) => {
    const userId = req.params.id;
    const mapId = req.body.mapId
    addFavouriteMap(userId, mapId, db)
      .then(() => {
        return getFavouriteMaps(userId, db);
      })
      .then(result => res.json(result))
      .catch(err => {
        res.status(500)
          .json({ error: err.message });
      });
  });

  //GET Route to user's contri
  router.get("/contributions/:id", (req, res) => {
    const userId = req.params.id;
    //ADJUST FUNCTION
    getFavouriteMaps(userId, db)
      .then(maps => res.json(maps))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // test routes
  router.post("/contributions/:id", (req, res) => {
    const userId = req.params.id;
    const mapId = req.body.mapId
    addFavouriteMap(userId, mapId, db)
      .then(() => {
        return getFavouriteMaps(userId, db);
      })
      .then(result => res.json(result))
      .catch(err => {
        res.status(500)
          .json({ error: err.message });
      });
  });

  return router;

};
