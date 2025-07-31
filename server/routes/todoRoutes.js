const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoControllers');
const checkAuth = require('../middleware/checkAuth');

router.get('/', todoController.getTodos);
router.post('/', todoController.createTodos);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
