exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('posts', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    table.decimal('lat', 10, 8).notNullable();
    table.decimal('lng', 11, 8).notNullable();
    table.text('content').notNullable();
    table.string('title', 100).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
