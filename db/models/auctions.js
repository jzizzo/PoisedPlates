const db = require('../');

const Auction = db.Model.extend({
  tableName: 'auctions',
  images: function() {
    return this.hasMany('Image');
  }
});

module.exports = db.model('Auctions', Auction);
