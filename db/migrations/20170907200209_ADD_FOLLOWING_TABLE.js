
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('followings', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    table.integer('following_id').references('profiles.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('followings');
};
