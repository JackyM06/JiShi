const express = require('express')
const router = express.Router()
const ControlUser = require('../controller/user')

router.get('/user',(req,res,next)=>{
    ControlUser.getUserIndex(req.session.user,req.query,(err,data)=>{
        if(err) return next(err)
        if(data.is404) return next()
        return res.render('user.html',data)
    })
})

router.post('/user/update',(req,res,next)=>{
    ControlUser.getUserUpdate(req.session.user,req.body.userInfo,(err,data)=>{
        if(err) return next(err)
        if(!data.is404) req.session.user.userInfo = req.body.userInfo
        return res.status(data.status).json(data.jsonData)
    })
    
})

module.exports = router