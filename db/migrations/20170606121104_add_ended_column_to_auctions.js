
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('auctions', function (table) {
      table.boolean('ended', 100).notNullable().defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('auctions', function (table) {
      table.dropColumn('ended');
    })
  ]);
};
