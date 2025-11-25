// example route file (not used by main but included as structure)
module.exports = function(app) {
  app.get('/sample', (req, res) => {
    res.json({ sample: true });
  });
};
