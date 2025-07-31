/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("todo", (table) => {
    table.specificType("id", "serial").primary();
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.string("todo_title").notNullable();
    table.text("content");
    table.timestamp("date_made").defaultTo(knex.fn.now());
    table.string("status").defaultTo("on hold");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todo");
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
