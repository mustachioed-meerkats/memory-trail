
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('stories', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    table.string('title', 100).notNullable();
    table.text('summary').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('stories');
};
