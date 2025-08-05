/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('playlist').del();

  await knex('playlist').insert([
    { user_id: 1, song_name: 'Yellow', song_artist: 'Coldplay', song_link: 'https://example.com/yellow' },
    { user_id: 1, song_name: 'Halo', song_artist: 'Beyoncé', song_link: 'https://example.com/halo' },
    { user_id: 1, song_name: 'Sunflower', song_artist: 'Post Malone', song_link: 'https://example.com/sunflower' },

    { user_id: 2, song_name: 'Levitating', song_artist: 'Dua Lipa', song_link: 'https://example.com/levitating' },
    { user_id: 2, song_name: 'Stay', song_artist: 'The Kid LAROI', song_link: 'https://example.com/stay' },
    { user_id: 2, song_name: 'Someone Like You', song_artist: 'Adele', song_link: 'https://example.com/adele' },

    { user_id: 3, song_name: 'Peaches', song_artist: 'Justin Bieber', song_link: 'https://example.com/peaches' },
    { user_id: 3, song_name: 'Shivers', song_artist: 'Ed Sheeran', song_link: 'https://example.com/shivers' },
    { user_id: 3, song_name: 'Heat Waves', song_artist: 'Glass Animals', song_link: 'https://example.com/heatwaves' },

    { user_id: 4, song_name: 'drivers license', song_artist: 'Olivia Rodrigo', song_link: 'https://example.com/drivers' },
    { user_id: 4, song_name: 'Ghost', song_artist: 'Justin Bieber', song_link: 'https://example.com/ghost' },
    { user_id: 4, song_name: 'Flowers', song_artist: 'Miley Cyrus', song_link: 'https://example.com/flowers' },

    { user_id: 5, song_name: 'Viva La Vida', song_artist: 'Coldplay', song_link: 'https://example.com/viva' },
    { user_id: 5, song_name: 'Anti-Hero', song_artist: 'Taylor Swift', song_link: 'https://example.com/antihero' },
    { user_id: 5, song_name: 'Good 4 U', song_artist: 'Olivia Rodrigo', song_link: 'https://example.com/good4u' },
  ]);
};
