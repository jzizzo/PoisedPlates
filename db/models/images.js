const db = require('../');

const Image = db.Model.extend({
  tableName: 'images',
  auction: function() {
    return this.belongsTo('Auctions');
  }
});

module.exports = db.model('Images', Image);
