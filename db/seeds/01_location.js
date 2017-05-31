
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('location').del()
    .then(function () {
      // Inserts seed entries
      return knex('location').insert([
        {id: 1, city: 'San Francisco', state: 'CA'},
        {id: 2, city: 'San Francisco', state: 'CA'},
        {id: 3, city: 'San Francisco', state: 'CA'},
        {id: 4, city: 'San Francisco', state: 'CA'}
      ]);
    });
};
