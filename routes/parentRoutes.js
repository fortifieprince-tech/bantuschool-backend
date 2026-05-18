const express = require('express')
const router = express.Router()
const { ajouterParent, connexionParent, listerParents } = require('../controllers/parentController')

router.post('/', ajouterParent)
router.post('/connexion', connexionParent)
router.get('/ecole/:ecole_id', listerParents)

module.exports = router