const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sizes: {
        type: [String],
        required: true
    },
    tags: {
        type: [String]
    },
    details: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = Product = mongoose.model('products', productSchema)