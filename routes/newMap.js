"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/new/:mapId", (req, res) => {
    let mapId = req.params.mapId
    res.render("displayMap");

  });

  return router;
};


