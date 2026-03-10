const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    category:{
        type:String
    },

    image:{
        type:String
    },
     stock: {
    type: Number
  }


})

module.exports = mongoose.model("Product",productSchema)