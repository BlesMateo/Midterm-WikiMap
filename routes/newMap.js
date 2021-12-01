"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/new/:mapId", (req, res) => {
    const templateVars =  { mapId: req.params.mapId }

    return db
    .query(`SELECT * FROM maps WHERE id = $1`, [req.params.mapId])
    .then(result => {
      if (result.rows[0]) {
        let templateVars = { title: result.rows[0].title, description: result.rows[0].description, location: result.rows[0].location }
        res.render("displayMap", templateVars )
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch(error => console.log(error.message));
  });



  return router;
};


