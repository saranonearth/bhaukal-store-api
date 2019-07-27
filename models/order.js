const mongoose = require('mongoose')
const shortid = require('shortid')


const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderId: {
        type: String,
        default: shortid.generate
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            required: true
        },
        qty: {
            type: String,
            required: true
        }
    }],
    status: {
        type: String,
        default:'On process'
    },
    expDate: {
        type: String,
        default: 'Pretty Soon ;)'
    }
}, {
    timestamps: true
})

module.exports = Order = mongoose.model('orders', orderSchema)