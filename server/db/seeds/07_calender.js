/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('calender').del();

  await knex('calender').insert([
    { user_id: 1, event_name: 'Dress Fitting', date_due: '2025-08-10', repeated: false, desciption: 'Try on the final wedding dress.' },
    { user_id: 1, event_name: 'Venue Visit', date_due: '2025-08-11', repeated: false, desciption: 'Check reception space.' },
    { user_id: 1, event_name: 'Color Samples', date_due: '2025-08-12', repeated: false, desciption: 'Pick bridesmaid colors.' },

    { user_id: 2, event_name: 'Cake Tasting', date_due: '2025-08-13', repeated: false, desciption: 'Try different flavors.' },
    { user_id: 2, event_name: 'Florist Meeting', date_due: '2025-08-14', repeated: false, desciption: 'Finalize bouquet styles.' },
    { user_id: 2, event_name: 'Guestlist Review', date_due: '2025-08-15', repeated: false, desciption: 'Cut down RSVP list.' },

    { user_id: 3, event_name: 'Hair Trial', date_due: '2025-08-16', repeated: false, desciption: 'Choose wedding hairstyle.' },
    { user_id: 3, event_name: 'Makeup Trial', date_due: '2025-08-17', repeated: false, desciption: 'Test full glam look.' },
    { user_id: 3, event_name: 'Decor Planning', date_due: '2025-08-18', repeated: false, desciption: 'Pick centerpieces.' },

    { user_id: 4, event_name: 'Bridal Shower', date_due: '2025-08-19', repeated: false, desciption: 'Fun party with friends!' },
    { user_id: 4, event_name: 'DJ Consultation', date_due: '2025-08-20', repeated: false, desciption: 'Pick the music vibe.' },
    { user_id: 4, event_name: 'Menu Tasting', date_due: '2025-08-21', repeated: false, desciption: 'Try reception meals.' },

    { user_id: 5, event_name: 'Dance Rehearsal', date_due: '2025-08-22', repeated: false, desciption: 'Practice first dance.' },
    { user_id: 5, event_name: 'Ring Pick-up', date_due: '2025-08-23', repeated: false, desciption: 'Collect wedding bands.' },
    { user_id: 5, event_name: 'Final Guest Confirmations', date_due: '2025-08-24', repeated: false, desciption: 'Follow up on RSVPs.' },
  ]);
};
