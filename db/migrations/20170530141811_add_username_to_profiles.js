
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function (table) {
      table.string('username', 100).nullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function (table) {
      table.dropColumn('username');
    })
  ]);
};
