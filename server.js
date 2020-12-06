const express = require('express')
const connectDB = require('./config/db')


const app = express()

connectDB()

app.use(express.json({
    extended: false
}))

const PORT = process.env.PORT || 5000



app.use('/api/auth/', require('./routes/auth'))
if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client','build', 'index.html' ))
    })
}




app.listen(PORT, ()=> console.log(`Server started on Port ${PORT}`))