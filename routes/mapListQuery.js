// const { json } = require('express');
// const express = require('express');
// const router = express.Router();

// module.exports = (db) => {
//   router.get("/map/list", (req, res) => {
//     // const templateVars =  { mapId: req.params.mapId }
//     console.log("-------------------")
//     return db
//       .query(`SELECT title FROM maps
//             LIMIT 3`)
//       .then(result => {
//         console.log("==============", result.rows)
//         if (result.rows[0]) {
//           let templateVars = { list0: result.rows[0].title, list1: result.rows[1].title }
//           res.render("mapList", templateVars)
//           return result.rows[0];
//         } else {
//           return null;
//         }
//       })
//       .catch(error => console.log(error.message));
//   });

//   return router;
// }
