
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Jim', email: 'jim@yahoo.com', location_id: 1, phone: '313-555-5555'},
        {id: 2, name: 'Steve', email: 'steve@yahoo.com', location_id: 2, phone: '650-555-5555'},
        {id: 3, name: 'Joe', email: 'joe@yahoo.com', location_id: 3, phone: '510-555-5555'},
        {id: 4, name: 'Doug', email: 'doug@yahoo.com', location_id: 4, phone: '415-305-9739'}
      ]);
    });
};
