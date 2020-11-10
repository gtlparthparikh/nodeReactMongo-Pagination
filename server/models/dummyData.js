const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
const dummySchema = new Schema({
    id:{
        type:Number
    },
    userId:{
        type:Number
    },
    title:{
        type:String
    },
    body:{
        type:String
    }
})
dummySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('dummyData',dummySchema,'dummyData')