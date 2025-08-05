const express = require('express')
const router = express.Router()
const playlistControllers = require('../controllers/playlistControllers')
const checkAuth = require('../middleware/checkAuth')

router.get('/', checkAuth, playlistControllers.getPlaylist)
router.post('/', checkAuth, playlistControllers.createPlaylist)
router.patch('/:id', checkAuth, playlistControllers.updatePlaylist)
router.delete('/:id', checkAuth, playlistControllers.deletePlaylist)

module.exports = router