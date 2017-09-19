
exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.string('story_name', 100).nullable();
    table.string('landmark_name', 100).nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('landmark_name');
    table.dropColumn('story_name');
  });
};
