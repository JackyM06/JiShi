const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')

const router = require('./routers/mainRouter')

const app = express()

app.engine('html',require('express-art-template'))

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(session({
    secret: 'jishi bymjk',
    resave: false,
    saveUninitialized: true  
}))


mongoose.connect('mongodb://localhost/jishi',{useNewUrlParser: true})

app.use(router)

app.use((req,res)=>{
    res.render('404.html')
})

app.use((err,req,res,next)=>{
    res.status(200).json({
        err_code: 500,
        message: err.message
    })
})

app.listen(3000,()=>{
    console.log('Server is Running http://127.0.0.1:3000')
})