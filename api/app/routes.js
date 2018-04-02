const tree = require('./controllers/tree');

const apiRoutes = (app) => {
  tree(app);
};

module.exports = apiRoutes;
