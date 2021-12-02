"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/mapTest", (req, res) => {
    console.log(req.query);
    res.render("displayMap", req.query);

  });

  return router;
};


