const express = require('express')

const router = express.Router()

const controller = require('../controllers/PengumumanController')

router.get('/', controller.getPengumuman)

module.exports = router