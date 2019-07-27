const User = require('../models/User')
const Article = require('../models/Article')

/**
 * 处理用户主页的文章列表的数据
 * 当前用户，步长，当前页，排序条件，callback
 */
exports.IndexListPage = (user,limit,currentPage,where,callback)=>{
    Article.find({}).sort(where).limit(currentPage*limit).exec((err,data)=>{
        if(err) return callback(err)
        return callback(null,{
            user: user,
            articles: data
        })
    })
}

/**
 * 获取更多的推荐文章
 * 步长，当前页，排序条件，callback
 */
exports.indexGetmore = (limit,currentPage,where,callback)=>{
    Article.find({}).sort(where).skip((parseInt(currentPage)-1)*limit).limit(limit).exec((err,data)=>{
        if(err) return callback(err)
        if(data.length>0){
            return callback(null,{
                status: 200,
                getOK: true,
                jsonData: {
                    err_code: 0,
                    articles: data,
                    message: 'getmore is success'
                }
            })
        }else{
            return callback(null,{
                status: 200,
                getOK: false,
                jsonData: {
                    err_code: 1,
                    message: 'load fulled'
                }
            })
        }
    })
}