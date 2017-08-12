var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var productSchema = new Schema({
    "productId" : String,
    "productName" : String,
    "salePrice" : Number,
    "productImage" : String
})
var Good = mongoose.model('Good',productSchema)
module.exports = Good