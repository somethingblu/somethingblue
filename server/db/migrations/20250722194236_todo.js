/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
      return knex.schema.createTable('todo', (table) => {
        table.increments('id').primary();
        table.integer('user_id');
        table.string('todo_title', 255).notNullable();
        table.text('content');
        table.timestamp('date_made').defaultTo(knex.fn.now());
        table.string('status', 255).defaultTo('on hold');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todo');
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
