const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auths');
  },
  auctions: function() {
    return this.hasMany('Auctions');
  },
  bids: function() {
    return this.hasMany('Bids');
  },
  auctionBids: function() {
    return this.hasMany('Auctions').through('Bids', 'id', 'profile_id', 'auction_id', 'id');
  }

});

module.exports = db.model('Profiles', Profile);
