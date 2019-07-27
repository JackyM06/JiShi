const express = require('express')
const router = express.Router()
const ControlWriter = require('../controller/writer')

router.get('/writer',(req,res,next)=>{
    ControlWriter.getWriterIndex(req.session.user,(err,data)=>{
        if(err) return next(err)
        if(data.isLoginout) return res.redirect('/login')
        return res.render('writer.html',data.jsonData)
    })
})

router.post('/writer/save',(req,res,next)=>{
    ControlWriter.postWriterSave(req.session.user,req.body,(err,data)=>{
        if(err) return next(err)
        return res.status(data.status).json(data.jsonData)
    })
})

router.get('/writer/open',(req,res,next)=>{
    ControlWriter.getWriterOpen(req.query.id,(err,data)=>{
        if(err) return next(err)
        return res.status(data.status).json(data.jsonData)
    })

})

router.get('/writer/delete',(req,res,next)=>{
    id = req.query.id
    ControlWriter.getWriterDelete(req.session.user,req.query.id,(err,data)=>{
        if(err) return next(err)
        return res.status(data.status).json(data.jsonData)
    })

})

module.exports = router