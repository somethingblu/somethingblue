/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('playlist', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.text('song_name').notNullable();
    table.text('song_artist').notNullable();
    table.text('song_link'); // Using text instead of url, since PostgreSQL doesn't have a 'url' type by default
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('playlist');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
