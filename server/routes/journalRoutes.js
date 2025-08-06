const express = require('express')
const router = express.Router()
const journalControllers = require('../controllers/journalControllers')
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth, journalControllers.getJournal)
router.post('/', checkAuth, journalControllers.createJournal)
router.patch('/:id', checkAuth, journalControllers.updateJournal)
router.delete('/:id', journalControllers.deleteJournal)

module.exports = router;