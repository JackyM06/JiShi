const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    nickname:{
        type:String,
        required: true
    },
    telephoneNumber:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    userInfo:{
        type:String,
        default:'这个人懒死啦！(￢︿̫̿￢☆)'
    },
    follows:{
        type:Array,
        default: []
    },
    fans:{
        type:Array,
        default: []
    },
    articleID:{
        type:Array,
        default: []
    },
    commentID:{
        type:Array,
        default: []
    }
})

module.exports = mongoose.model('User',UserSchema)