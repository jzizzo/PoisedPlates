
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('auctions').del()
    .then(function () {
      // Inserts seed entries
      var date = new Date();
  

      return knex('auctions').insert([
        { profile_id: 2, category_id: 17, location_id: 1, end_time: date, title: 'sofa', description: 'Grey Love Seat slight worn'},
        { profile_id: 3, category_id: 1, location_id: 2, end_time: date, title: 'table', description: 'antiques table oak/maple with marble corners'},
        { profile_id: 4, category_id: 20, location_id: 3, end_time: date, title: 'tent', description: 'REI 2010 green medium tent'},
        { profile_id: 5, category_id: 15, location_id: 4, end_time: date, title: 'camera', description: 'camera 35MM cannon'}
      ]);
    });
};

