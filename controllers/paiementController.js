const supabase = require('../models/supabase')

const genererRecu = () => {
  const num = Math.floor(10000 + Math.random() * 90000)
  return `REC-${num}`
}

const ajouterPaiement = async (req, res) => {
  const { eleve_id, mois, annee, montant } = req.body
  const numero_recu = genererRecu()

  const { data: existant } = await supabase
    .from('paiements')
    .select('id')
    .eq('eleve_id', eleve_id)
    .eq('mois', mois)
    .eq('annee', annee)
    .single()

  if (existant) {
    return res.status(400).json({ error: 'Ce mois est déjà payé !' })
  }

  const { data, error } = await supabase
    .from('paiements')
    .insert([{ eleve_id, mois, annee, montant, numero_recu }])
    .select()

  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json({
    message: 'Paiement enregistré !',
    paiement: data[0],
    recu: numero_recu
  })
}

const paiementsParEleve = async (req, res) => {
  const { eleve_id } = req.params

  const { data, error } = await supabase
    .from('paiements')
    .select('*')
    .eq('eleve_id', eleve_id)
    .order('annee', { ascending: true })
    .order('mois', { ascending: true })

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

module.exports = { ajouterPaiement, paiementsParEleve }