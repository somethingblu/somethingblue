const express = require('express')
const router = express.Router()
const contactsController = require('../controllers/contactsControllers')
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth, contactsController.getContacts)
router.post('/', checkAuth, contactsController.createContacts)
router.put('/:id', checkAuth, contactsController.updateContacts)
router.delete('/:id', checkAuth, contactsController.deleteContact)

module.exports = router