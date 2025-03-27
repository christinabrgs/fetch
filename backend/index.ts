import express from "express";
const cors = require('cors')
import dogRoutes from './routes/dogRoutes'
import dotenv from 'dotenv';

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/dogs', dogRoutes)


const PORT = process.env.PORT || 5001

app.listen(PORT, () => {console.log(`server running on port ${PORT}`)})