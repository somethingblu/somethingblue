/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("contacts", (table) => {
    table.specificType("id", "serial").primary();
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("vendor_type").notNullable();
    table.string("phone_number");
    table.string("email");
    table.string("socials");
    table.string("address");
    table.string("borough");
    table.string("zip");
    table.string("availability");
    table.text("notes");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("contacts");
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
