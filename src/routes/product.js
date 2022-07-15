const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/product");

router.get("/", (req, res) => {
    Product.find().exec().then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        res.status(500).json({
            "error": "Unable to get the products"
        });
    });
});

router.post("/", (req, res) => {
    if (req.body.name && req.body.price) {
        const newProduct = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        });
        newProduct.save().then((result) => {
            res.status(201).json({
                "message": "Product created successfully"
            })
        }).catch((err) => {
            res.status(400).json({
                "message": "Unable to create product"
            })
        })
    } else {
        res.status(400).json({
            message: "Bad request"
        })
    }

    console.log("res is", req.body);

})
router.get("/:productId", (req, res, next) => {
    Product.findById(req.params.productId).exec().then(result => {
        res.status(200).json({
            data: result
        })
    }).catch(err => {
        res.status(400).json({
            "message": "Unable to fetch product"
        })
    })

})
router.patch("/:productId", (req, res, next) => {
    res.status(200).json({
        data: req.params.productId,
        method: "patch"
    })
})
router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    if (id) {
        Product.deleteOne({ _id: id }).exec().then(result => {
            res.status(200).json({
                "message": "product deleted"
            })
        }).catch(error => {
            res.status(500).json({
                "message": "Unable to delete product"
            })
        })
    }
    else {
        res.status(400).json({
          "message":"Bad request"
        })
    }

})

module.exports = router;