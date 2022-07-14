const express=require("express");
const router=express.Router();
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
    console.log("res is",req.body);
    res.status(200).json({
        data:req.body
    });
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