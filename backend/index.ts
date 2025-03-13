import express from "express";
const cors = require('cors')
import dogRoutes from './routes/dogRoutes'


const app = express()

app.use(cors())
app.use(express.json())
app.use('/dogs', dogRoutes)


const PORT = 5000;

app.listen(PORT, () => {console.log(`server running on port ${PORT}`)})