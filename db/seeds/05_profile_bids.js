
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profile_bids').del()
    .then(function () {
      // Inserts seed entries
      var date = new Date();
      return knex('profile_bids').insert([
        {id: 1, profile_id: 1, auction_id: 1, bid: '5'},
        {id: 2, profile_id: 2, auction_id: 2, bid: '6'},
        {id: 3, profile_id: 3, auction_id: 3, bid: '7'},
        {id: 4, profile_id: 4, auction_id: 4, bid: '8'}
      ]);
    });
};
