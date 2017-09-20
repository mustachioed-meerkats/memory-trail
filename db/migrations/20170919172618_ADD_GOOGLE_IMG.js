
exports.up = function(knex, Promise) {
  return knex.schema.table('profiles', function(table) {
    table.string('img', 100).nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('profiles', function(table) {
    table.dropColumn('img');
  });
};