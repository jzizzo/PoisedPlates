const models = require('../../db/models');

module.exports.getAllCategories = (cb) => {
  return models.Category
    .collection()
    .fetch({
      columns: ['id', 'name']
    })
    .then(categories => {
      cb(null, categories);
    })
    .catch(err => {
      cb(err, null);
    });
};
