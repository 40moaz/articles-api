const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1- get Products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            message: "The Products have been fetched successfully",
            products: products
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
});

// 2- post Product
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            brand: req.body.brand,
            category: req.body.category,
            thumbnail: req.body.thumbnail,
            images: req.body.images
        });

        await newProduct.save();

        res.json({
            message: "The Product was created successfully",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
});

// 3- get one Product
router.get("/:id", async (req, res) => {
    try {
        const oneProduct = await Product.findById(req.params.id);
        res.json({
            message: "The Product has been fetched successfully",
            product: oneProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
});

// 4- edit one Product 
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                brand: req.body.brand,
                category: req.body.category,
                thumbnail: req.body.thumbnail,
                images: req.body.images
            },
            { new: true } // This option returns the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "The product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
});
// 5- delete Product
router.delete("/:id", async (req, res) => {
    try {
        const oneProduct = await Product.findByIdAndDelete(req.params.id);
        res.json({
            message: "The Product has been deleted successfully",
            product: oneProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message
        });
    }
});

module.exports = router;
