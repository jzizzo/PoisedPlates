const db = require('../');

const Auction = db.Model.extend({
  tableName: 'auctions',
  images: function() {
    return this.hasMany('Image');
  },
  location: function() {
    return this.belongsTo('Locations');
  },
  auctionOwner: function() {
    return this.belongsTo('Profile');
  },
  bids: function() {
    return this.hasMany('ProfileBids');
  },
  category: function() {
    return this.belongsTo("Category");
  },
  bidsProfiles: function() {
    return this.hasMany('Profile').through('ProfileBids', 'id', 'profile_id');
  }

});

module.exports = db.model('Auctions', Auction);

