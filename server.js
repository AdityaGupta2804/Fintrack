import express from 'express'
import connectDB from './dbConnect.js'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import cors from 'cors'
import path from 'path'

dotenv.config()
connectDB()

const app = express()
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:3000', // React dev server
    credentials: true
  }))
}
app.use(express.json())

const __dirname = path.resolve()

// Available routes
app.use('/api/users', userRoutes)
app.use('/api/transactions', transactionRoutes)

if (process.env.NODE_ENV === 'production') {
  const root = path.join(__dirname, 'frontend', 'build')
  app.use(express.static(root))

  app.get('*', (req, res) => {
    res.sendFile(path.join(root, 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
