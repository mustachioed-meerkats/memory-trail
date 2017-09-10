
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('landmarks', function(table) {
    table.increments('id').unsigned().primary();
    table.string('name', 100).notNullable();
    table.text('description');
    table.text('image_url');
    table.decimal('lat', 10, 8).notNullable();
    table.decimal('lng', 11, 8).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('landmarks');
};
