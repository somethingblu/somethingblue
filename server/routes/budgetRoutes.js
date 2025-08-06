const express = require('express')
const router = express.Router()
const budget_itemsControllers = require('../controllers/budget_itemsControllers')
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth, budget_itemsControllers.getBudgetItem)
router.post('/', checkAuth, budget_itemsControllers.createBudgetItem)
router.patch('/:id', checkAuth, budget_itemsControllers.updateBudgetItem)
router.delete('/:id', checkAuth, budget_itemsControllers.deleteBudgetItem)

module.exports = router;