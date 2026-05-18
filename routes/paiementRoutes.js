const express = require('express')
const router = express.Router()
const { ajouterPaiement, paiementsParEleve } = require('../controllers/paiementController')

router.post('/', ajouterPaiement)
router.get('/:eleve_id', paiementsParEleve)

module.exports = router