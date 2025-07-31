/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todo').del()
  await knex('todo').insert([
  { id: 1, user_id: 1, todo_title: 'Book Venue', content: 'Look at venues in Brooklyn', status: 'currently' },
  { id: 2, user_id: 1, todo_title: 'Order Cake', content: 'Talk to Little Cupcake Bakeshop', status: 'on hold' },
  { id: 3, user_id: 2, todo_title: 'Hire Photographer', content: 'Meet with candid photography specialists', status: 'currently' },
  { id: 4, user_id: 3, todo_title: 'Send Invitations', content: 'Finalize guest list and send invites', status: 'finished' },
  { id: 5, user_id: 4, todo_title: 'Plan Rehearsal Dinner', content: 'Coordinate with caterer and family', status: 'on hold' }
]);
};
