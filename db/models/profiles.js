const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  auctions: function() {
    return this.hasMany('Auctions');
  },
  profileBids: function() {
    return this.hasMany('ProfileBids');
  }

});

module.exports = db.model('Profile', Profile);
