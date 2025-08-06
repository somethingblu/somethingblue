/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('budget_items').del()
  await knex('budget_items').insert([
  { id: 1, contact_id: 1, label: 'Floral Arrangements', price: 1500, amount_given: 500 },
  { id: 2, contact_id: 2, label: 'DJ Booking', price: 1000, amount_given: 250 },
  { id: 3, contact_id: 3, label: 'Photography Package', price: 2200, amount_given: 1200 },
  { id: 4, contact_id: 4, label: 'Planning Fee', price: 3000, amount_given: 3000 },
  { id: 5, contact_id: 5, label: 'Catering Deposit', price: 5000, amount_given: 2000 }
]);
};
