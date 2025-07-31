/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id: 1, name: 'Alice Johnson', email:'alice@example.com', password:'hashedpassword1', budget: 15000, wedding_date: '2027-10-12'},
    { id: 2, name: 'Juan Cruz', email: 'juan@example.com', password: 'hashedpassword2', budget: 20000, wedding_date: '2025-09-04' },
    { id: 3, name: 'Clara Liu', email: 'clara@example.com', password: 'hashedpassword3', budget: 12000, wedding_date: '2026-06-05' },
    { id: 4, name: 'Diego Martinez', email: 'diego@example.com', password: 'hashedpassword4', budget: 18000, wedding_date: '2025-11-30' },
    { id: 5, name: 'Elena Rossi', email: 'elena@example.com', password: 'hashedpassword5', budget: 22000, wedding_date: '2025-08-10' }
  ]);
};
