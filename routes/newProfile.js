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
      const promise2 = db.query("SELECT * FROM favourites WHERE user_id = $1", [req.session.user_id])
      const promise3 = db.query("SELECT * FROM contributions WHERE user_id = $1", [req.session.user_id])

      Promise.all([promise1, promise2, promise3])
        .then(result => {
          let templateVars = {
            userMaps: result[0].rows,
            userFavorite: result[1].rows,
            userContributions: result[2].rows
          }

          console.log("----------:", templateVars);
          res.render("newProfile", templateVars);
          // return result.rows[0];
        })
        .catch(error => {
          console.log(error.message)
        });

    }

  });

  return router;

};


