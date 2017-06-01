
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {id: 1, city: 'San Francisco', state: 'CA'},
        {id: 2, city: 'San Diego', state: 'CA'},
        {id: 3, city: 'New York', state: 'NY'},
        {id: 4, city: 'Chicago', state: 'IL'}
      ]);
    });
};
