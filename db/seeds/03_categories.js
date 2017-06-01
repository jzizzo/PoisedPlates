
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name:'antiques' },
        {id: 2, name:' appliances' },
        {id: 3, name:' arts+crafts' },
        {id: 4, name:' atv/utv/sno' },
        {id: 5, name:' auto parts' },
        {id: 6, name:' baby+kid' },
        {id: 7, name:' beauty+hlth' },
        {id: 8, name:' bikes' },
        {id: 9, name:' boats' },
        {id: 10, name:' books' },
        {id: 11, name:' cars+trucks' },
        {id: 12, name:' cell phones' },
        {id: 13, name:' clothes' },
        {id: 14, name:' computers' },
        {id: 15, name:' electronics' },
        {id: 16, name:' farm+garden' },
        {id: 17, name:' furniture' },
        {id: 18, name:' general' },
        {id: 19, name:' household' },
        {id: 20, name:' camping' },
        {id: 21, name:' tools' },
        {id: 22, name:' toys+games' }
      ]);
    });
};

