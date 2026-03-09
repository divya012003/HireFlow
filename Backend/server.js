const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const connectDB = require('./config/db')
require("dotenv").config()
const userRouter = require('./routes/userRoute')
const jobRouter = require('./routes/jobRoutes')

app.use(cors())
app.use(express.json())
app.use('/api',userRouter)
app.use('/api/jobs',jobRouter)

// datbase
connectDB()



app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);   
})