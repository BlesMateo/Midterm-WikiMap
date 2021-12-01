const express = require('express');
const router = express.Router();
const { editMap } = require('../lib/mapQueries');


router.post('/:id', (req, res) => {
  const mapId = req.params.id;
  editMap({ ...req.body, id: mapId })
    .then(maps => res.json(maps))
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router
