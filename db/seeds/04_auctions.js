
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('auctions').del()
    .then(function () {
      // Inserts seed entries
      var date = new Date();
      return knex('auctions').insert([
        {id: 1, users: 1, category_id: 3, location_id: 1, end_time: date.setDate(date.getDate() + 3), title: 'sofa', description: '', created_at: date},
        {id: 2, users: 2, category_id: 13, location_id: 2, end_time: date.setDate(date.getDate() + 5), title: 'table', description: '', created_at: date},
        {id: 3, users: 3, category_id: 15, location_id: 3, end_time: date.setDate(date.getDate() + 2), title: 'coffee table', description: '', created_at: date},
        {id: 4, users: 4, category_id: 9, location_id: 4, end_time: date.setDate(date.getDate() + 7), title: 'camera', description: '', created_at: date}
      ]);
    });
};
