/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('images', (table) => {
    table.increments('id').primary();
    table.integer('journal_id').notNullable().references('id').inTable('journal').onDelete('CASCADE');
    table.text('link').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('images');
};
