const knex = require('../db/knex');

exports.getTodos = async (req, res) => {
  const userId = req.session.userId;
  try {
    const todos = await knex('todo')
      .where({ user_id: userId })
      .orderBy('date_made', 'desc'); 
    res.json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

exports.createTodos = async (req, res) => {
  const { todo_title, content, status } = req.body;
  const userId = req.session.userId;

  if (!todo_title || todo_title.trim() === '') {
    return res.status(400).json({ error: 'Todo title is required' });
  }

  try {
    const [newTodo] = await knex('todo')
      .insert({
        todo_title: todo_title.trim(),
        content: content ? content.trim() : null, 
        status: status || 'on hold', 
        user_id: userId,
      })
      .returning('*');
    
    res.status(201).json(newTodo);
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
};


exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo_title, content, status } = req.body;
  const userId = req.session.userId;

  if (!todo_title || todo_title.trim() === '') {
    return res.status(400).json({ error: 'Todo title is required' });
  }

  try {
    const [updated] = await knex('todo')
      .where({ id: Number(id), user_id: userId })
      .update({
        todo_title: todo_title.trim(),
        content: content ? content.trim() : null,
        status: status
      })
      .returning('*');

    if (!updated) {
      const exists = await knex('todo')
        .where({ id: Number(id) })
        .first();
      console.log('Todo found for any user:', exists);
      return res.status(404).json({ error: 'Todo not found or access denied' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
};


exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const deletedCount = await knex('todo')
      .where({ id, user_id: userId })
      .del();

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Todo not found or access denied' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};