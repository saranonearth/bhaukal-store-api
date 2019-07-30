const isAuth = require('../util/isAuth')
const {
    validationResult
} = require('express-validator');
const Product = require('../models/product');
const Order = require('../models/order')

// Protected only ADMIN - POST - ADD Product
exports.postAddProduct = async (req, res) => {
    const {
        title,
        description,
        price,
        image,
        tags,
        sizes,
        details
    } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {

        const tagsArr = tags.split(',');
        const sizesArr = sizes.split(',');

        const newProduct = new Product({
            title,
            description,
            price,
            image,
            sizes: sizesArr,
            tags: tagsArr,
            details
        })

        await newProduct.save()

        return res.status(200).json({
            msg: 'Product added',
            product: newProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }

}

// Protected only ADMIN - PATCH - Edit Product

exports.editProduct = async (req, res) => {
    const {
        title,
        description,
        price,
        image,
        tags,
        sizes,
        details
    } = req.body
    const productId = req.params.productid
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    try {
        const tagsArr = tags.split(',');
        const sizesArr = sizes.split(',');

        const newProduct = {
            title,
            description,
            price,
            image,
            sizes: sizesArr,
            tags: tagsArr,
            details
        }

        const product = await Product.findOneAndUpdate(productId, {
            $set: newProduct
        }, {
            new: true
        })

        return res.status(200).json({
            msg: 'Product Updated',
            product: product
        })


    } catch (error) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
}

// Protected only ADMIN - DELETE - Remove Product
exports.deleteProduct = async (req, res) => {
    const productId = req.params.productid

    try {
        await Product.findOneAndDelete(productId, (err) => {
            if (err) return res.json(422).json({
                msg: 'Product delete failed'
            })

            return res.status(200).json({
                msg: 'Product deleted'
            })
        })
    } catch (error) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
}

// Public - GET - get all products

exports.getProducts = async (req, res) => {


    try {
        const products = await Product.find({})
        return res.status(200).json(products)
    } catch (error) {
        return res.status(422).json({
            errors: errors.array()
        })
    }


}

exports.getProduct = async (req, res) => {
    const productId = req.params.productid

    try {
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                msg: 'Product not found'
            })
        }

        res.status(200).json(product)

    } catch (error) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
}