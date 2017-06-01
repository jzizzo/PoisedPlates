const db = require('../');

const Image = db.Model.extend({
  tableName: 'images',
  auction: function() {
    return this.belongsTo('Auction');
  }
});

module.exports = db.model('Image', Image);

