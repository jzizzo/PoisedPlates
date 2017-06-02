const db = require('../');

const Location = db.Model.extend({
  tableName: 'locations',
  auctions: function() {
    return this.hasMany('Auctions');
  },
  profiles: function() {
    return this.hasOne('Profile');
  }
});

module.exports = db.model('Locations', Location);

