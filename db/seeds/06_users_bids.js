
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      var date = new Date();
      return knex('table_name').insert([
        {id: 1, users: 1, auctions: 1, bid: '5', user_bid_at: date},
        {id: 2, users: 2, auctions: 2, bid: '6', user_bid_at: date},
        {id: 3, users: 3, auctions: 3, bid: '7', user_bid_at: date},
        {id: 4, users: 4, auctions: 4, bid: '8', user_bid_at: date}
      ]);
    });
};
