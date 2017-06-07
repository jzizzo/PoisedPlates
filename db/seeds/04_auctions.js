
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('auctions').del()
    .then(function () {
      // Inserts seed entries
      let now = new Date();
      let future = new Date(Date.now() + 100000000000).toISOString();
      return knex('auctions').insert([
        { profile_id: 2, category_id: 17, location_id: 1, end_time: now, title: 'sofa', description: 'Brown Love Seat slight worn', ended: true },
        { profile_id: 3, category_id: 1, location_id: 2, end_time: now, title: 'table', description: 'antiques table oak/maple with marble corners' },
        { profile_id: 4, category_id: 20, location_id: 3, end_time: now, title: 'rain proof tent', description: 'REI 2010 green medium tent' },
        { profile_id: 5, category_id: 15, location_id: 4, end_time: now, title: 'Canon camera', description: 'camera 35MM cannon' },
        { profile_id: 5, category_id: 15, location_id: 4, end_time: future, title: 'Apple MacBook Pro 13-inch', description: 'Gently Used, mid-2015' },
        { profile_id: 5, category_id: 15, location_id: 4, end_time: future, title: 'klean kanteen insulated', description: '27oz green' },
        { profile_id: 2, category_id: 22, location_id: 1, end_time: future, title: 'Baseball bat', description: 'Tan, oak, 15lbs' }
      ]);
    });
};
