"use strict";

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("////////////////////////////////")
    if (!req.session.user_id) {
      return res.redirect('/')
    } else {

      const promise1 = db.query("SELECT * FROM maps WHERE user_id = $1", [req.session.user_id])
      const promise2 = db.query(`SELECT maps.* FROM favourites
      JOIN maps ON map_id = maps.id
        JOIN users ON favourites.user_id = users.id
           WHERE favourites.user_id = $1`, [req.session.user_id])
      const promise4 = db.query(`SELECT maps.* FROM contributions
      JOIN maps ON map_id = maps.id
        JOIN users ON contributions.user_id = users.id
           WHERE contributions.user_id = $1`, [req.session.user_id])

      Promise.all([promise1, promise2, promise4])
        .then(result => {
          let templateVars = {
            userMaps: result[0].rows,
            userFavourite: result[1].rows,
            userContributions: result[2].rows
          }
          res.render("newProfile", templateVars);
        })
        .catch(error => {
          console.log(error.message)
        });
    }
  });

  return router;

};


