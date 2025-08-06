const express = require('express')
const router = express.Router()
const calenderControllers = require('../controllers/calenderControllers')
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth, calenderControllers.getCalender)
router.post('/', checkAuth, calenderControllers.createCalender)
router.patch('/:id', checkAuth, calenderControllers.updateCalender)
router.delete('/:id', checkAuth, calenderControllers.deleteCalender)

module.exports = router