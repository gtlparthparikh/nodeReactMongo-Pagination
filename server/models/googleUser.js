const mongoose = require('mongoose')
const Schema = mongoose.Schema
const guserSchema = new Schema({
    gId:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type: String
    },
    token:{
        type:String
    }
})
module.exports = mongoose.model('guser',guserSchema,'gusers')