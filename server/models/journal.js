const db = require('../db');

exports.getJournalEntries = (userId) => {
  return db('journal')
    .where({ user_id: userId })
    .orderBy('date_made', 'desc');
};

exports.createJournalEntry = (entry) => {
  return db('journal')
    .insert(entry)
    .returning('*');
};

exports.updateJournalEntry = (id, updates) => {
  return db('journal')
    .where({ id })
    .update(updates)
    .returning('*');
};

exports.deleteJournalEntry = (id) => {
  return db('journal')
    .where({ id })
    .del();
};
