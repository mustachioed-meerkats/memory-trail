
exports.up = function(knex, Promise) {
  return knex.schema.table('followings', function(table) {
    table.boolean('currently_following').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('followings', function(table) {
    table.dropColumn('currently_following');
  });
};
