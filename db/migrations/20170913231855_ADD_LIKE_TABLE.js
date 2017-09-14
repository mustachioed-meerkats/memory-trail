
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('posts_likes', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    table.integer('post_id').references('posts.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts_likes');
};
