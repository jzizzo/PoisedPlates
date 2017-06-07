const db = require('../');

const Bid = db.Model.extend({
  tableName: 'bids',
  auction: function() {
    return this.belongsTo('Auctions');
  },
  profile: function() {
    return this.belongsTo('Profiles');
  }
});

module.exports = db.model('Bids', Bid);
