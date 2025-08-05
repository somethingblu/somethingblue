/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('calender', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.text('event_name');
    table.date('date_due');
    table.boolean('repeated');
    table.text('desciption'); // typo matches your schema exactly — let me know if you want to fix to "description"
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('calender');
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
