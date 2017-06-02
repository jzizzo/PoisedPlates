
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        { auction_id: 1, url: 'http://i.imgur.com/sZQnzuA.jpg'},
        { auction_id: 2, url: 'http://i.imgur.com/8QNiXK3.jpg'},
        { auction_id: 3, url: 'http://i.imgur.com/Qw5ixo6.jpg'},
        { auction_id: 4, url: 'http://i.imgur.com/SC4UHAU.png'}
      ]);
    });
};
