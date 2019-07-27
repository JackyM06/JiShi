const express = require('express')
const router = express.Router()
const ControIndex = require('../controller/index')

router.get('/',(req,res,next)=>{
    req.session.currentPage = req.session.currentPage  || 1
    ControIndex.IndexListPage(req.session.user,10,req.session.currentPage,{LikeID:-1,lastTime:-1},(err,data)=>{
        if(err)return next(err)
        return res.render('index.html',data)
    })
})

router.get('/index/getmore',(req,res,next)=>{
    let currentPage = req.session.currentPage+1 || 1
    ControIndex.indexGetmore(10,currentPage,{LikeID:-1,lastTime:-1},(err,data)=>{
        if(err) return next(err)
        if(data.getOK) req.session.currentPage++
        return res.status(data.status).json(data.jsonData)
    })
})

router.get('/loginout',(req,res)=>{
    console.log(req.session.user.nickname+'已退出！')
    delete req.session.user
    res.redirect('/')
})

module.exports = router