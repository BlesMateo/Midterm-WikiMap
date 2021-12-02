"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.query);
    res.render("displayMap", req.query);

  });

  return router;
};


