const db = require('../db');

exports.getAllTodosByUser = (userId) => {
  return db('todos')
  .where({ user_id: userId })
  .orderBy('created_at', 'desc');
};

exports.createTodo = (todo) => {
  return db('todos')
  .insert(todo)
  .returning('*');
};

exports.updateTodo = (id, updates) => {
  return db('todos')
  .where({ id })
  .update(updates)
  .returning('*');
};

exports.deleteTodo = (id) => {
  return db('todos')
  .where({ id })
  .del();
};
