
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // return knex('profiles').del()
  //   .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        // { first: 'Jim', last: 'Lee', email: 'jimleeisme@gmail.com', location_id: 1, phone: '313-555-5555' },
        // { first: 'Steve', last: 'Kim', email: 'emailstevenkim@gmail.com', location_id: 1, phone: '650-555-5555' },
        // { first: 'Joe', last: 'Zizzo', email: 'zizzo.joseph.k@gmail.com', location_id: 1, phone: '510-555-5555' },
        // { first: 'Doug', last: 'Cox', email: 'dougecox@gmail.com', location_id: 4, phone: '415-305-9739' }
        { first: 'Jim', last: 'Lee', email: 'jimleeisme@gmail.com', location_id: 1, phone: '313-555-5555' },
        { first: 'Steve', last: 'Kim', email: 'emailstevenkim@gmail.com', location_id: 1, phone: '650-555-5555' },
        { first: 'Joe', last: 'Zizzo', email: 'zizzo.joseph.k@gmail.com', location_id: 1, phone: '510-555-5555' },
        { first: 'Doug', last: 'Cox', email: 'dougecox@gmail.com', location_id: 4, phone: '415-305-9739' }
      ]);
    // });
};
