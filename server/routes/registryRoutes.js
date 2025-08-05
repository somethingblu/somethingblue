const express = require('express')
const router = express.Router()
const registryControllers = require('../controllers/registryControllers')
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth, registryControllers.getRegistry)
router.post('/', checkAuth, registryControllers.createRegistry)
router.patch('/:id', checkAuth, registryControllers.updateRegistry)
router.delete('/:id', checkAuth, registryControllers.deleteRegistry)

module.exports = router