const db = require('../db');

exports.getCalendarEvents = (userId) => {
  return db('calender')
    .where({ user_id: userId })
    .orderBy('date_due');
};

exports.createCalendarEvent = (event) => {
  return db('calender')
    .insert(event)
    .returning('*');
};

exports.updateCalendarEvent = (id, updates) => {
  return db('calender')
    .where({ id })
    .update(updates)
    .returning('*');
};

exports.deleteCalendarEvent = (id) => {
  return db('calender')
    .where({ id })
    .del();
};
