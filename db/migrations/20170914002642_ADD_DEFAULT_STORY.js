
exports.up = function(knex, Promise) {
  return knex.schema.table('stories', function(table) {
    table.boolean('default_post').defaultTo(false);
    table.boolean('default_display').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('stories', function(table) {
    table.dropColumn('default_display');
    table.dropColumn('default_post');
  });
};
