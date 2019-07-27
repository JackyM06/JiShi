const Article = require('../models/Article')

/**
 * 处理写作页数据
 */
exports.getWriterIndex = (user,callback)=>{
    if(user){
        Article.find({
            nickname: user.nickname
        },(err,data)=>{
            if(err) return callback(err)
            return callback(null,{
                jsonData:{
                    articles:data
                }
            })
            res.render('writer.html',{
                articles: data
            })
        })
    }else{
        callback(null,{isLoginout:true})
    }
}

/**
 * 处理作品保存数据
 */
exports.postWriterSave = (user,body,callback)=>{
    if(user){
        if(body.id){
            Article.findById(body.id,(err,data)=>{
                if(err) return callback(err)
                if(data && user.nickname == data.nickname){
                    Article.updateOne(data,{
                        title: body.title,
                        content: body.content,
                        Introduction: body.Introduction,
                        lastTime: Date()
                    },(err,data)=>{
                        if(err) return callback(err)
                        return callback(null,{
                            status:200,
                            jsonData:{
                                err_code: 1,
                                message: '给您更新好啦(ง •_•)ง'
                            }
                        }) 
                    })
                }
            })     
        }else{
            body.nickname = user.nickname
            new Article(body).save().then((d)=>{
                return callback(null,{
                    status: 200,
                    jsonData: {
                        err_code: 0,
                        id: d._id,
                        message: '给您保存好啦(ง •_•)ง'
                    }
                })
            }).catch(e=>{callback(e)})
        }
    }else{
        return callback(null,{
            status:200,
            jsonData:{
                err_code: -1,
                message: '未登录'
            }
        }) 
    }
}

/**
 * 处理要打开的作品数据
 */

 exports.getWriterOpen = (id,callback)=>{
    if(id){
        Article.findById(id,(err,data)=>{
            if(err) return callback(err)
            return callback(null,{
                status: 200,
                jsonData:{
                    err_code: 0,
                    id: data._id,
                    title: data.title,
                    content: data.content,
                    message: 'open success!'
                }
            })
        })
    }
 }
 
 /**
  * 处理删除文章
  */
 exports.getWriterDelete = (user,id,callback)=>{
    Article.findById(id,(err,data)=>{
        if(err) return callback(err)
        if(user.nickname == data.nickname){
            Article.deleteOne(data,err=>{
                if(err) return callback(err)
                return callback(null,{
                    status:200,
                    jsonData:{
                        err_code:0,
                        message: 'delete is ok'  
                    }
                })
            })
        }
    })
 }