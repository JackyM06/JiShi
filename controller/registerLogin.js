const User = require('../models/User')
const md5 = require('blueimp-md5')

/**
 * 处理登录数据
 */
exports.postLogin = (body,callback)=>{
    User.findOne({
        $or:[
        {telephoneNumber: body.Number},
        {nickname: body.Number}
        ],
        password: md5(md5(body.password))
    },(err,data)=>{
        if(err) return callback(err)
        if(data){
            return callback(null,{
                status: 200,
                userData: data,
                jsonData:{
                    err_code:0,
                    message: 'ok'
                }
            })
        }
        return  callback(null,{
            status: 200,
            userData: null,
            jsonData: {
                err_code: 1,
                message: '手机号或用户名或密码有误!'
            }
        })
    })
}

/**
 * 处理注册数据
 */
exports.postRegister = (body,callback)=>{
    User.findOne({
        $or: [
            {nickname: body.nickname},
            {telephoneNumber: body.telephoneNumber}
        ]
    },(err,data)=>{
        if(err)return callback(err)
        if(data){
            return callback(null,{
                status: 200,
                userData:null,
                jsonData:{
                    err_code: 1,
                    message: '用户名或手机号已存在！'
                }
            })
        }
        body.password = md5(md5(body.password))
        new User(body).save()
        .then((data)=>{
            return callback(null,{
                status: 200,
                userData: data,
                jsonData:{
                    err_code: 0,
                    message: '注册成功' 
                }
            })
        }).catch(e=>{callback(e)})
    })
}