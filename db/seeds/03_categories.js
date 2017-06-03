
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { name:'antiques' },
        { name:'appliances' },
        { name:'arts+crafts' },
        { name:'atv/utv/sno' },
        { name:'auto parts' },
        { name:'baby+kid' },
        { name:'beauty+hlth' },
        { name:'bikes' },
        { name:'boats' },
        { name:'books' },
        { name:'cars+trucks' },
        { name:'cell phones' },
        { name:'clothes' },
        { name:'computers' },
        { name:'electronics' },
        { name:'farm+garden' },
        { name:'furniture' },
        { name:'general' },
        { name:'household' },
        { name:'camping' },
        { name:'tools' },
        { name:'toys+games' }
      ]);
    });
};
