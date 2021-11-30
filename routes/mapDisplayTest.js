"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/map", (req, res) => {
    console.log(req.query);
    res.render("mapTest", req.query);

  });

  return router;
};


