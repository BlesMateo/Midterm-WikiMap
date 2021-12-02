"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/map/edit/:mapId", (req, res) => {
    return db
    .query(`SELECT title FROM maps
    WHERE maps.id = $1`, [req.params.mapId])
    .then(result => {
      console.log(result);
      if (result.rows[0]) {
        let templateVars = { mapId: req.params.mapId, title: result.rows[0].title, search: req.query }
        console.log(result.rows)
        res.render("mapTest", templateVars);
        return result.rows[0];
      } else {
        console.log("I am now here")
        return null;
      }
    })
    .catch(error => console.log(error.message));



  });

  return router;
};


