const Article =  require('../models/Article')

/**
 *  处理文章主页数据
 * 文章id,req.session.uesr,callback
 */
exports.articleIndex = (id,user,callback)=>{
    if(id){
        Article.findById(id,(err,data)=>{
            if(err) return callback(err)
            if(user){
                let index = data.LikeID.findIndex(element=>element == user._id)
                if(index>=0){
                    return callback(null,{
                        user: user,
                        isLike: true,
                        article:data
                    })
                }
            }
            return callback(null,{
                user: user || null,
                isLike:false,
                article:data
            })
        })
    }else{
        return callback(null,null)
    }
}

/**
 * 处理喜欢文章的数据
 * 文章id,当前用户的信息，callback
 */
exports.like = (id,user,callback)=>{
    if(user){
        let userId = user._id
        Article.findById(id,(err,data)=>{
            if(err) return callback(err)
            let likeIds = JSON.parse(JSON.stringify(data.LikeID))
            let index = likeIds.findIndex(element=>element === userId)
            if(index<0){
                likeIds.push(userId)
                Article.updateOne(data,{
                    LikeID: likeIds
                },(err,data)=>{
                    if(err)return callback(err)
                    return callback(null,{
                        status:200,
                        jsonData:{
                            err_code: 0,
                            message: 'like is ok'
                        }
                    })
                })
            }else{
                likeIds.pop(userId)
                Article.updateOne(data,{
                    LikeID: likeIds
                },(err,data)=>{
                    if(err)return callback(err)
                    return callback(null,{
                        status: 200,
                        jsonData:{
                            err_code: 1,
                            message: 'unlike is ok'
                        }
                    })
                })
            }
        })
    }else{
        return callback(null,{
            status:200,
            jsonData:{
                err_code: 2,
                message: '请先登录！'
            }
        })
    }
}