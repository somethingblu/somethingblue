/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('registry_list', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.text('registry_name');
    table.decimal('price').notNullable();
    table.text('description');
    table.boolean('was_purchased');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('registry_list');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
