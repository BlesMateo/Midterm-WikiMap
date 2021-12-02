"use strict";

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //route name alittle overkill?
  router.post("/map/delete/:marker_id", (req, res) => {
    console.log('The marker has deleted!');
    console.log(req.params.marker_id);
    //confirming that the id exists
    if (req.params.marker_id > 0); {
      // console.log(req.params.marker_id);
      return db
        // hard coded marker_id 13 for now.
        .query(`DELETE FROM marker WHERE id = ${req.params.marker_id};`)
        .then(result => {
          res.send("Its been deleted!")
        })
        .catch(error => {
          res.status(500).send("error.message")
          // console.log("hello:", error);
        })
    }

  });

  return router;
};
