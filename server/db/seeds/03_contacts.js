/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('contacts').del()
  await knex('contacts').insert([
  {
    id: 1, user_id: 1, name: 'Bloom Florist', vendor_type: 'florist', phone_number: '718-555-1234',
    email: 'bloom@example.com', socials: '@bloomnyc', address: '123 Flower Rd', borough: 'Brooklyn',
    zip: '11215', availability: 'M-F 10-6', notes: 'Offers seasonal bouquets'
  },
  {
    id: 2, user_id: 2, name: 'DJ Tempo', vendor_type: 'dj', phone_number: '917-555-7890',
    email: 'tempo@example.com', socials: '@djtempo', address: '88 Beat St', borough: 'Queens',
    zip: '11377', availability: 'Weekends only', notes: 'Ask about lighting package'
  },
  {
    id: 3, user_id: 3, name: 'Snap Magic Photography', vendor_type: 'photographer', phone_number: '646-555-9876',
    email: 'snap@example.com', socials: '@snapmagic', address: '456 Lens Ln', borough: 'Manhattan',
    zip: '10001', availability: 'All week', notes: '10% off referral'
  },
  {
    id: 4, user_id: 1, name: 'Elegant Events', vendor_type: 'planner', phone_number: '212-555-3333',
    email: 'events@example.com', socials: '@elegantevents', address: '789 Plan Blvd', borough: 'Brooklyn',
    zip: '11238', availability: 'M-F', notes: 'Works with Bloom Florist'
  },
  {
    id: 5, user_id: 5, name: 'Tasty Bites Catering', vendor_type: 'caterer', phone_number: '347-555-4444',
    email: 'tasty@example.com', socials: '@tastybites', address: '321 Food Ave', borough: 'Bronx',
    zip: '10467', availability: 'Weekdays', notes: 'Schedule a tasting'
  }
]);
};
