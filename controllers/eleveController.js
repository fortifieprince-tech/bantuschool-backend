const supabase = require('../models/supabase')

const ajouterEleve = async (req, res) => {
  const { nom, classe, cycle, parent_id, ecole_id } = req.body

  const { data, error } = await supabase
    .from('eleves')
    .insert([{ nom, classe, cycle, parent_id, ecole_id }])
    .select()

  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json({ message: 'Élève ajouté !', eleve: data[0] })
}

const listerEleves = async (req, res) => {
  const { ecole_id } = req.params

  const { data, error } = await supabase
    .from('eleves')
    .select('*, parents(*)')
    .eq('ecole_id', ecole_id)

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

const getEleve = async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('eleves')
    .select('*, parents(*), ecoles(*)')
    .eq('id', id)
    .single()

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

module.exports = { ajouterEleve, listerEleves, getEleve }

const mettreAJourEleve = async (req, res) => {
  const { id } = req.params
  const { parent_id } = req.body

  const { data, error } = await supabase
    .from('eleves')
    .update({ parent_id })
    .eq('id', id)
    .select()

  if (error) return res.status(400).json({ error: error.message })
  res.json({ message: 'Élève mis à jour !', eleve: data[0] })
}

module.exports = { ajouterEleve, listerEleves, getEleve, mettreAJourEleve }