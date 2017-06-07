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
  }

});

module.exports = db.model('Profiles', Profile);
