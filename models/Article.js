const mongoose = require('mongoose')

let ArticleSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    Introduction:{
        type:String
    },
    content:{
        type:String,
        required: true
    },
    nickname:{
        type:String,
        required: true
    },
    createTime:{
        type:Date,
        default:Date()
    },
    lastTime:{
        type:Date,
        default:Date()
    },
    commentID:{
        type: Array,
        default: []
    },
    LikeID:{
        type:Array,
        default:[]
    }
})

module.exports = mongoose.model('Article',ArticleSchema)
