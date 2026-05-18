const express = require('express')
const router = express.Router()
const { ajouterEleve, listerEleves, getEleve, mettreAJourEleve } = require('../controllers/eleveController')

router.post('/', ajouterEleve)
router.get('/ecole/:ecole_id', listerEleves)
router.get('/:id', getEleve)
router.put('/:id', mettreAJourEleve)

module.exports = router