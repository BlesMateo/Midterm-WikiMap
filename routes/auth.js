/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {



  router.post("/register7", (req, res) => {
    console.log(req.body)
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        console.log(err.message)
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/register", (req, res) => {
    const { email, username, password } = req.body
    console.log("==========", req.body)
    // return res.render("profile",{ user: req.body });
    getUserByEmail(email, db)
    .then (result => {
      console.log("+++++++++". result)
      if (result) {
        return res.status(403).send({ status: "error", message: "You already have an account please login" })
      }

      db.query(`INSERT into users (email, password, name, description)
      VALUES ($1, $2, $3, $4) RETURNING *`, [email, password, username, 1])
      .then(data => {
        const user = data.rows[0];
        req.session.user_id = user.id
        return res.render("profile",{ user });
      })
      .catch(err => {
        console.log(err.message)
        res
          .status(500)
          .json({ error: err.message });
      });
    })

  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body
    console.log("==========", req.body)
    // return res.render("profile",{ user: req.body });
    getUserByEmail(email, db)
    .then (user => {
      console.log("+++++++++". result)
      if (!user) {
        return res.status(403).send({ status: "error", message: "You dont have an account please register" })
      }

      if (user.password !== password) {
        return res.status(403).send({ status: "error", message: "Invalid login" })
      }

      req.session.user_id = user.id
      return res.render("profile",{ user });

    })

  });



  // router.post("/login", (req, res) => {
  //   console.log(req.body)
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       console.log(err.message)
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  return router;
};

const getUserByEmail = function(email, db) {
  console.log("__email", email)
  return db.query(`SELECT * FROM users WHERE email = $1;`, [email])
  .then(data => {
    const user = data.rows[0];
    console.log("%%%%%%%%%%%", user)
    return user
  })
  .catch(err => {
    console.log(err.message)
    return err.message
  });
}


