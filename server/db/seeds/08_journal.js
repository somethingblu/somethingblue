/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('journal').del();

  await knex('journal').insert([
    { user_id: 1, entry_title: 'Picked the Dress!', date_made: '2025-08-01', entry: 'Cried a little. It’s so perfect.' },
    { user_id: 1, entry_title: 'Invites Ordered', date_made: '2025-08-02', entry: 'Gold foil with dusty rose.' },
    { user_id: 1, entry_title: 'Feeling Stressed', date_made: '2025-08-03', entry: 'Too many opinions from mom.' },

    { user_id: 2, entry_title: 'Found the Venue', date_made: '2025-08-04', entry: 'Charming barn with string lights.' },
    { user_id: 2, entry_title: 'First Dance Song', date_made: '2025-08-05', entry: 'Still undecided. We keep changing it.' },
    { user_id: 2, entry_title: 'Tried on Shoes', date_made: '2025-08-06', entry: 'Need comfort AND sparkle.' },

    { user_id: 3, entry_title: 'Met with Planner', date_made: '2025-08-07', entry: 'She’s amazing — calmed me down.' },
    { user_id: 3, entry_title: 'Bachelorette Plans', date_made: '2025-08-08', entry: 'Vegas is calling 🎉' },
    { user_id: 3, entry_title: 'DIY Decor Night', date_made: '2025-08-09', entry: 'Glue guns everywhere. Worth it.' },

    { user_id: 4, entry_title: 'Mom Cried', date_made: '2025-08-10', entry: 'When she saw the dress 💕' },
    { user_id: 4, entry_title: 'Picked Cake Flavors', date_made: '2025-08-11', entry: 'Lemon raspberry FTW.' },
    { user_id: 4, entry_title: 'Made a Countdown Board', date_made: '2025-08-12', entry: '52 days to go!' },

    { user_id: 5, entry_title: 'Got Our Marriage License', date_made: '2025-08-13', entry: 'It’s getting real now.' },
    { user_id: 5, entry_title: 'First Cold Feet Moment', date_made: '2025-08-14', entry: 'Normal nerves, right?' },
    { user_id: 5, entry_title: 'Feeling Loved', date_made: '2025-08-15', entry: 'Everyone’s helping so much.' },
  ]);
};
