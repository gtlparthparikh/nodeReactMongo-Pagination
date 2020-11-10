const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema
const productSchema = new Schema({
    name:{
        type:String
    },
    imageUrl:{
        type:String
    },
    price:{
        type:Number
    }
})
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('product',productSchema,'products')