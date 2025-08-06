const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userControllers')
const checkAuth = require('../middleware/checkAuth')

router.patch('/me', checkAuth, userControllers.updateUser)

module.exports = router