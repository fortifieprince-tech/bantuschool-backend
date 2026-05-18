const supabase = require('../models/supabase')

const ajouterEcole = async (req, res) => {
  const { nom, ville, mensualite, inscription } = req.body

  const { data, error } = await supabase
    .from('ecoles')
    .insert([{ nom, ville, mensualite, inscription }])
    .select()

  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json({ message: 'École ajoutée !', ecole: data[0] })
}

const listerEcoles = async (req, res) => {
  const { data, error } = await supabase
    .from('ecoles')
    .select('*')

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

module.exports = { ajouterEcole, listerEcoles }