const express = require('express')

const router = express.Router()

const controller = require('../controllers/KelasController')

router.get('/', controller.getListKelasReguler)
router.get('/reguler', controller.getContentOfKelasReguler)
router.get('/reguler/detail', controller.getKelasRegulerStudents)

module.exports = router