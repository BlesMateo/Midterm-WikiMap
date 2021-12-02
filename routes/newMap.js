"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/new/:mapId", (req, res) => {
    const templateVars =  { mapId: req.params.mapId }
    console.log('I am here')
    return db
    .query(`SELECT maps.title, maps.description, location, marker.title as name, marker.description as marker_description, lng, lat, place_id
    FROM maps
    LEFT OUTER JOIN marker ON maps.id = map_id
    WHERE maps.id = $1`, [req.params.mapId])
    .then(result => {
      console.log(result);
      if (result.rows[0]) {
        let templateVars = { mapId: req.params.mapId, title: result.rows[0].title, description: result.rows[0].description, location: result.rows[0].location,
        markers: JSON.stringify(result.rows) }
        console.log(result.rows)
        res.render("displayMap", templateVars )
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


