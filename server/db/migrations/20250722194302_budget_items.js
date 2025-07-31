/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("budget_items", (table) => {
    table.specificType("id", "serial").primary();
    table.integer("contact_id").references("id").inTable("contacts").onDelete("CASCADE");
    table.string("label").notNullable();
    table.decimal("price").notNullable();
    table.decimal("amount_given").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("budget_items");
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
