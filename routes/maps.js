const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //Creates a new map post request -- adds to database
  router.post("/new", (req, res) => {
    return result = db
      .query(`INSERT INTO maps (title, description, location, user_id)
VALUES ($1, $2, $3, $4)
RETURNING * ;`, [req.body.title, req.body.description, req.body.city, req.session.user_id])
      .then(result => {
        if (result.rows[0]) {
          console.log(result);
          let id = result.rows[0].id
          res.redirect(`/map/new/${id}`);
          return result.rows[0];
        } else {
          return null;
        }
      })
      .catch(error => console.log(error.message));
  })


  router.get("/new/:mapId", (req, res) => {
    const templateVars = { mapId: req.params.mapId }
    console.log('I am here')
    return db
      .query(`SELECT maps.title, maps.description, location, marker.title as name, marker.description as marker_description, lng, lat, place_id, user_id FROM maps LEFT OUTER JOIN marker ON maps.id = map_id WHERE maps.id = $1`, [req.params.mapId])
      .then(result => {
        console.log(result);
        if (result.rows[0]) {
          let templateVars = {
            mapId: req.params.mapId, title: result.rows[0].title, description: result.rows[0].description, location: result.rows[0].location,
            markers: JSON.stringify(result.rows)
          }
          console.log(result.rows)
          res.render("displayMap", templateVars)
          return result.rows[0];
        } else {
          console.log("I am now here")
          return null;
        }
      })
      .catch(error => console.log(error.message));
  });

  //Get route to the new page creation
  router.get("/new", (req, res) => {
    console.log(req.query);
    res.render("createMap", req.query);
  })

  router.get("/edit/:mapId", (req, res) => {
    return db
      .query(`SELECT title, location FROM maps
    WHERE maps.id = $1`, [req.params.mapId])
      .then(result => {
        console.log(result);
        if (result.rows[0]) {
          let templateVars = { mapId: req.params.mapId, title: result.rows[0].title, search: req.query, mapLocation: result.rows[0].location }
          console.log(result.rows)
          res.render("mapTest", templateVars);
          return result.rows[0];
        } else {
          console.log("I am now here")
          return null;
        }
      })
      .catch(error => console.log(error.message));
  });

  return router;

}

