const db = require('../');

const Auction = db.Model.extend({
  tableName: 'auctions',
  images: function() {
    return this.hasMany('Images');
  },
  location: function() {
    return this.belongsTo('Locations');
  },
  auctionOwner: function() {
    return this.belongsTo('Profiles');
  },
  bids: function() {
    return this.hasMany('Bids');
  },
  category: function() {
    return this.belongsTo("Categories");
  },
  bidders: function() {
    return this.hasMany('Profiles').through('Bids', 'id', 'auction_id', 'profile_id', 'id');
  }

});

module.exports = db.model('Auctions', Auction);
