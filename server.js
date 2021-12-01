// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/maps", (req, res) => {
  console.log(req.query);
  res.render("mapTest", req.query);

});

// Need to complete data base tables before moving forward
// Hardcoded user #1 in our database to test outcome of this map route.
// app.get("/maps", (req, res) => {
//   db.query("SELECT * FROM map WHERE user_id = 1")
//     .then(function (results) {
//       res.json(results.rows);

//     });
// });

//Endpoint - Create map for user
app.post("/map/new", (req, res) => {
  const { userId, title, description } = req.body
  return db
    .query(`INSERT INTO maps (user_id, title, description) VALUES ($1, $2, $3)`, [userId, title, description])

});
// Endpoint - Create a marker
app.post("/map/location_marker", (req, res) => {
  const { long, lat, place_id } = req.body
  return db
    .query(`INSERT INTO location_marker (title, map_id, long, lat, place_id)
    VALUES ($1, $2, $3, $4, $5);`, ["Test", 5, long, lat, place_id])

});

//Throw this function into another file into lib
const addToMaps = function (userId, title, description) {
  return db
    .query(`INSERT INTO maps(user_id, title, description) VALUES($1, $2, $3)
  RETURNING *; `, [userId, title, description])
    .then(res => res.rows);
}


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT} `);
});
