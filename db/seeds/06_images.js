
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
    .then(function () {
      // Inserts seed entries
      return knex('images').insert([
        {id: 1, auction_id: 1, url: 'http://i.imgur.com/sZQnzuA.jpg'},
        {id: 2, auction_id: 2, url: 'http://i.imgur.com/8QNiXK3.jpg'},
        {id: 3, auction_id: 3, url: 'http://i.imgur.com/Qw5ixo6.jpg'},
        {id: 4, auction_id: 4, url: 'http://i.imgur.com/SC4UHAU.png'}
      ]);
    });
};
