
exports.up = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.integer('story_id').references('stories.id').onDelete('CASCADE');
    table.integer('landmark_id').references('landmarks.id').onDelete('CASCADE');
    table.text('image_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('posts', function(table) {
    table.dropColumn('image_url');
    table.dropColumn('landmark_id');
    table.dropColumn('story_id');
  });
};
