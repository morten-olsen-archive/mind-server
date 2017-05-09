
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('email').unique();
      table.string('password');
      table.string('googleId');
      table.string('facebookId');
      table.string('githubId');
    })
    .createTable('documents', function(table) {
      table.string('id').primary();
      table.integer('user_id').references('users.id');
      table.bigInteger('created');
      table.bigInteger('updated');
      table.bigInteger('startDate');
      table.bigInteger('endDate');
      table.text('title');
      table.text('body');
      table.text('meta');
      table.text('tags');
      table.string('client');
      table.string('flag');
      table.integer('remainingTasks');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('users')
    .dropTable('documents');
};
