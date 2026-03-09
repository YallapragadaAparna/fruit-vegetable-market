const express = require("express")
const router = express.Router()

const Product = require("../models/Product")

// get products
router.get("/",async(req,res)=>{

    const products = await Product.find()

    res.json(products)

})

// add product
router.post("/",async(req,res)=>{

    const product = new Product(req.body)

    const saved = await product.save()

    res.json(saved)

})

module.exports = router