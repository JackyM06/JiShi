const express = require('express')
const router = express.Router()
const ControlRL = require('../controller/registerLogin')

router.get('/login',(req,res,next)=>{
    res.render('login.html')
})

router.post('/login',(req,res,next)=>{
    ControlRL.postLogin(req.body,(err,data)=>{
        if(err) return next(err)
        if(data.userData) req.session.user = data.userData
        return res.status(data.status).json(data.jsonData)
    })
})

router.post('/register',(req,res,next)=>{
    ControlRL.postRegister(req.body,(err,data)=>{
        if(err) return next(err)
        if(data.userData) req.session.user = data.userData
        return res.status(data.status).json(data.jsonData)
    })
})


module.exports = router

