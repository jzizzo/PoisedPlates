
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('locations', function (table) {
      table.increments('id').unsigned().primary();
      table.string('city', 50).notNullable();
      table.string('state', 50).notNullable();
    }),
    knex.schema.table('profiles', function (table) {
      table.string('username', 100).nullable();
      table.integer('location_id').references('locations.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('auctions', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('category_id').references('categories.id').onDelete('CASCADE');
      table.integer('location_id').references('locations.id').onDelete('CASCADE');
      table.timestamp('end_time').notNullable();
      table.string('title', 100).nullable();
      table.string('description', 200).nullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    }),
    knex.schema.createTableIfNotExists('images', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('auction_id').references('auctions.id').onDelete('CASCADE');
      table.string('url', 100).nullable();
    }),
    knex.schema.createTableIfNotExists('categories', function(table) {
      table.increments('id').unsigned().primary();
      table.string('name', 100).nullable();
      table.integer('parent_id', 50).nullable();
    }),
    knex.schema.createTableIfNotExists('profiles_bids', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
      table.integer('auction_id').references('auctions.id').onDelete('CASCADE');
      table.string('bid', 100).notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('locations'),
    knex.schema.table('profiles', function (table) {
      table.dropColumn('username');
      table.dropColumn('location_id');
    }),
    knex.schema.dropTable('images'),
    knex.schema.dropTable('profiles_bids'),
    knex.schema.dropTable('auctions'),
    knex.schema.dropTable('categories')
  ]);
};
