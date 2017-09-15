
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('landmarks_profiles', function(table) {
    table.increments('id').unsigned().primary();
    table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    table.integer('landmark_id').references('landmarks.id').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('landmarks_profiles');
};
