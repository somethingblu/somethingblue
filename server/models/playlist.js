const db = require('../db');

exports.getPlaylist = (userId) => {
  return db('playlist')
    .where({ user_id: userId })
    .orderBy('song_name');
};

exports.createPlaylistItem = (item) => {
  return db('playlist')
    .insert(item)
    .returning('*');
};

exports.updatePlaylistItem = (id, updates) => {
  return db('playlist')
    .where({ id })
    .update(updates)
    .returning('*');
};

exports.deletePlaylistItem = (id) => {
  return db('playlist')
    .where({ id })
    .del();
};
