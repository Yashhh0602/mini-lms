require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const courseRoutes = require('./routes/courseRoutes')
const progressRoutes = require('./routes/progressRoutes')

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/courses', courseRoutes)
app.use('/api/progress', progressRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Mini LMS API running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))