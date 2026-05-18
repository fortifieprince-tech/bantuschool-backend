require('dotenv').config()
const express = require('express')
const cors = require('cors')

const ecoleRoutes = require('./routes/ecoleRoutes')
const eleveRoutes = require('./routes/eleveRoutes')
const parentRoutes = require('./routes/parentRoutes')
const paiementRoutes = require('./routes/paiementRoutes')
const notificationRoutes = require('./routes/notificationRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'BantuSchool API est en ligne !' })
})

app.use('/api/ecoles', ecoleRoutes)
app.use('/api/eleves', eleveRoutes)
app.use('/api/parents', parentRoutes)
app.use('/api/paiements', paiementRoutes)
app.use('/api/notifications', notificationRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Serveur BantuSchool démarré sur le port ${PORT}`)
})