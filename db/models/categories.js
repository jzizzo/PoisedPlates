const db = require('../');

const Category = db.Model.extend({
  tableName: 'categories',
  category: function() {
    return this.hasMany('Auctions');
  }
});


module.exports = db.model('Categories', Category);
