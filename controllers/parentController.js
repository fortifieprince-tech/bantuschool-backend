const supabase = require('../models/supabase')

const genererCode = () => {
  const lettres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const chiffres = Math.floor(1000 + Math.random() * 9000)
  const lettre1 = lettres[Math.floor(Math.random() * lettres.length)]
  const lettre2 = lettres[Math.floor(Math.random() * lettres.length)]
  return `BS-${chiffres}-${lettre1}${lettre2}`
}

const ajouterParent = async (req, res) => {
  const { nom, telephone, ecole_id } = req.body
  const code_acces = genererCode()

  const { data, error } = await supabase
    .from('parents')
    .insert([{ nom, telephone, code_acces, ecole_id }])
    .select()

  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json({
    message: 'Parent ajouté !',
    parent: data[0],
    code_acces: data[0].code_acces
  })
}

const connexionParent = async (req, res) => {
  const { telephone, code_acces } = req.body

  const { data, error } = await supabase
    .from('parents')
    .select('*')
    .eq('telephone', telephone)
    .eq('code_acces', code_acces)
    .single()

  if (error || !data) {
    return res.status(401).json({ error: 'Téléphone ou code incorrect' })
  }

  res.json({ message: 'Connexion réussie !', parent: data })
}

const listerParents = async (req, res) => {
  const { ecole_id } = req.params

  const { data, error } = await supabase
    .from('parents')
    .select('*, eleves(*)')
    .eq('ecole_id', ecole_id)

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

module.exports = { ajouterParent, connexionParent, listerParents }