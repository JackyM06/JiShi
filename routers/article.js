const express = require('express')
const router = express.Router()
const ControlArticle = require('../controller/article')


router.get('/article',(req,res,next)=>{
    ControlArticle.articleIndex(req.query.articleId,req.session.user,(err,data)=>{
        if(err) return next(err)
        if(data) return res.render('article.html',data)
        return next()
    })
})

router.get('/article/like',(req,res,next)=>{
    ControlArticle.like(req.query.articleId,req.session.user,(err,data)=>{
        if(err) return next(err)
        return res.status(data.status).json(data.jsonData)
    })
})

module.exports = router
