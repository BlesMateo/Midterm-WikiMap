// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');
const { dataMethod } = require("./dataMethod");
app.use(cookieSession({
  name: 'session',
  keys: ['firstKey', 'secondKey']
}))
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
const { response } = require("express");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (require, response) => {
  const uLogin = require.session.user;
  response.render("index", {uLogin});
});

app.get('/login', (require, response) => { // to be determined page layout (redirect?)
  require.session.user = require.query.user;
  const uLogin = require.session.user;
  response.redirect('/');
})

app.post('/login', (require, response) => {
  const userEmail = require.body.email;
  const userPass = require.body.password;

  if(userEmail === " " && userPass === undefined) {
    response.status(403).send("Please enter your email");
    return;
  }
  if(userEmail === undefined && userPass === " ") {
    response.status(403).send("Please enter your password");
    return;
  }

  let query = `SELECT * FROM users;`;

  db.query(query)
    .then(data => {
      dataMethod(require, response, data.rows);
      return;
    })
    .catch(err => {
      response.status(500).json({error: err.message});
    });

});

app.post ("/register", (require, response) => {
  const userEmail = require.body.userEmail;
  const userPass = require.body.userPass;
  if (userPass === undefined && userEmail === " ") {
    response.status(403).send("Please enter an email address");
    return;
  }
  if (userPass === " " && userEmail === undefined) {
    response.status(403).send("Please enter your password");
    return;
  }
});

app.post("/logout", (require, response) => {
  require.session = null;
  response.redirect("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
