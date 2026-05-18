const express = require('express')
const router = express.Router()
const { ajouterEcole, listerEcoles } = require('../controllers/ecoleController')

router.post('/', ajouterEcole)
router.get('/', listerEcoles)

module.exports = router