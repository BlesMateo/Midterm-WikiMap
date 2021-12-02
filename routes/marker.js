"use strict";

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post("/map/:mapId/marker", (req, res) => {
    let mapId = req.params.mapId
    console.log(mapId);
    console.log('I got a request!');
    const { title, lng, lat, place_id } = req.body;
    console.log('info here', req.body);
    return db

      .query(`INSERT INTO marker (title, description, map_id, lng, lat, place_id)
          VALUES ($1, $2, $3, $4, $5, $6);`, [title, "description", mapId, parseFloat(lng), parseFloat(lat), place_id])

      .then(result => {
        res.send("Its been added!")
      })
      .catch(error => {
        res.status(500).send("error.message")
        console.log("hello:", error);
      })

  });

  return router;
};
