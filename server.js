const express = require('express')
const connectDB = require('./config/db')


const app = express()

connectDB()

app.use(express.json({
    extended: false
}))

const PORT = process.env.PORT || 5000

app.get('/', (req,res)=>res.send('API Running'))


app.use('/api/auth/', require('./routes/auth'))




app.listen(PORT, ()=> console.log(`Server started on Port ${PORT}`))