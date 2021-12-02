"use strict";

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("HERERERERERERE")
    if (!req.session.user_id) {
      return res.redirect('/')
    } else {
      // db.query("SELECT * FROM maps WHERE user_id = $1", [req.session.user_id])
      res.render("profile"); //need to review route
    }

  });

  return router;

};


