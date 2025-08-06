const knex = require('../db/knex')

exports.getPlaylist = async (req, res)  => {
    const userId = req.session.userId;

    try{
        const playlist = await knex ('playlist')
        .where({ user_id: userId })
        .orderBy('song_artist'); 
        res.json(playlist);
    } catch (err) {
        console.error('Error fetching playlist:', err);
        res.status(500).json({ error: 'Failed to fetch playlist' });
     }
};

exports.createPlaylist = async (req, res) => {
    const { song_name, song_artist, song_link } = req.body;
    const userId = req.session.userId

    if (!song_name || song_name.trim() === ''){
        return res.status(400).json({ error: 'Playlist name is required' });
    }
  try {
    const [newPlaylist] = await knex('playlist')
      .insert({
        song_name, 
        song_artist, 
        song_link,
        user_id: userId,
      })
      .returning('*');
    
    res.status(201).json(newPlaylist);
  } catch (err) {
    console.error('Error creating playlist:', err);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
};

exports.updatePlaylist = async (req, res) => {
  const { id } = req.params;
  const { song_name, song_artist, song_link } = req.body;
  const userId = req.session.userId;

 if (!song_name || song_name.trim() === ''){
        return res.status(400).json({ error: 'Song name is required' });
    }

  try {
    const [updatedPlaylist] = await knex('playlist')
      .where({ id, user_id: userId })
      .update({ 
        song_name, 
        song_artist, 
        song_link
      })
      .returning('*');

    if (!updatedPlaylist) {
      return res.status(404).json({ error: 'Playlist not found or access denied' });
    }

    res.json(updatedPlaylist);
  } catch (err) {
    console.error('Error updating playlist:', err);
    res.status(500).json({ error: 'Failed to update playlist' });
  }
};


exports.deletePlaylist = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const deletePlaylist = await knex('playlist')
      .where({ id, user_id: userId })
      .del();

    if (deletePlaylist === 0) {
      return res.status(404).json({ error: 'Playlist not found or access denied' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting playlist:', err);
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
};