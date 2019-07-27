const User = require('../models/User')
const Aritcle =  require('../models/Article')

/**
 * 处理用户主页数据，主要工作是界定权限
 */
exports.getUserIndex = (user,query,callback)=>{
    if(user && user.nickname === query.nickname){ //如果是本人
        Aritcle.find({nickname: user.nickname}).sort({LikeID:-1,lastTime:-1}).exec((err,articles)=>{
            if(err) return callback(err)
            let count=0
            for(let value of articles){
                count+=value.LikeID.length
            }
            return callback(null,{
                user: user,
                writer: user,
                likeCount:count, 
                articles: articles,
                myself: true
            })
        })
    }else if(query.nickname){                                         //如果不是本人
        User.findOne({
            nickname: query.nickname
        },(err,writer)=>{
            if(err) return callback(err)
            Aritcle.find({nickname: writer.nickname}).sort({LikeID:-1,lastTime:-1}).exec((err,articles)=>{
                if(err) return callback(err)
                let count=0
                for(let value of articles){ //计算收到的喜欢总是
                    count+=value.LikeID.length
                }
                return callback(null,{
                    user: user,
                    likeCount:count, 
                    writer:writer,
                    articles:articles,
                    myself:false
                })
            })
        })
    }else{
        return callback(null,{
            is404:true
        })
    }
}

/**
 * 处理更新用户自我介绍信息
 */

 exports.getUserUpdate = (user,userInfo,callback)=>{
    if(user && userInfo){
        User.updateOne(user,{
            userInfo: userInfo
        },(err)=>{
            if(err)return callback(err)
            return callback(null,{
                status: 200,
                jsonData: {
                    err_code: 0,
                    userInfo: userInfo,
                    message: 'userInfo update success'
                }
            })
        })
    }else{
        return callback(null,{
            status: 200,
            jsonData: {
                err_code: 1,
                message: 'update was error'
            }
        })
    }
 }