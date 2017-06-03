
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        { city: 'San Francisco', state: 'CA' },
        { city: 'San Diego', state: 'CA' },
        { city: 'New York', state: 'NY' },
        { city: 'Chicago', state: 'IL' }
      ]);
    });
};
