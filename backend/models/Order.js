const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

productName:String,
price:Number,
quantity:Number,
date:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Order",orderSchema)