
exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.decimal('score', 4, 2).notNullable().defaultTo(0);
    table.decimal('magnitude', 4, 2).notNullable().defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('magnitude');
    table.dropColumn('score');
  });
};
