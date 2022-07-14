const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const Product=require("../models/product");

router.get("/",(req,res)=>{
    res.status(200).json([ {
        "title": "Asparagus",
        "type": "vegetable",
        "description": "Asparagus with ham on the wooden table",
        "filename": "2.jpg",
        "height": 450,
        "width": 299,
        "price": 18.95,
        "rating": 3
      }, {
        "title": "Green smoothie",
        "type": "dairy",
        "description": "Glass of green smoothie with quail egg's yolk, served with cocktail tube, green apple and baby spinach leaves over tin surface.",
        "filename": "3.jpg",
        "height": 600,
        "width": 399,
        "price": 17.68,
        "rating": 4
      },])
});

router.post("/",(req,res)=>{
    const newProduct=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });
    newProduct.save().then((result)=>{
        res.status(201).json({
            "message":"Product created successfully"
        })
    }).catch((err)=>{
        res.status(400).json({
            "message":"Unable to create product"
        })
    })
    console.log("res is",req.body);
   
})
router.get("/:productId",(req,res,next)=>{
    res.status(200).json({
        data:req.params.productId
    })
})
router.patch("/:productId",(req,res,next)=>{
    res.status(200).json({
        data:req.params.productId,
        method:"patch"
    })
})
router.delete("/:productId",(req,res,next)=>{
    res.status(200).json({
        data:req.params.productId,
        method:"deleted"
    })
})

module.exports=router;