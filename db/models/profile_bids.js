const db = require('../');

const ProfileBids = db.Model.extend({
  tableName: 'profile_bids',
  auctions: function() {
    return this.belongsTo('Auctions');
  },
  profiles: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('ProfileBids', ProfileBids);

