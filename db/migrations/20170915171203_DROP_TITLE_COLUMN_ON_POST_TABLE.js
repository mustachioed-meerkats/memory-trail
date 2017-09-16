
exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('title');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.string('title', 100).notNullable();
  });
};
