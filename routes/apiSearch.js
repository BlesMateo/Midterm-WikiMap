module.exports = function(router) {

  router.get('/keyword', (req, res) => {
    const keyword = {keyword: req.body.text};
    getNearbyPlaces(position, keyword)
    .then(res.render('mapTest'))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  return router;
}


