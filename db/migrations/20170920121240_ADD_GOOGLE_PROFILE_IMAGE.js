
exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.string('profile_image', 100).nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('profile_image');
  });
};