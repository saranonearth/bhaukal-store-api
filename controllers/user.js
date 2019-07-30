const User = require('../models/user');
const Messege = require('../models/messege');
const {
    validationResult
} = require('express-validator');



// Protected - GET - Loggedin User
exports.getUser = async (req, res) => {
    const {
        userId
    } = req

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                msg: 'User not found'
            })
        }

        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }

}

// Protectd - DELETE - Remove user

exports.deleteUser = async (req, res) => {
    const {
        userId
    } = req

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                msg: 'User not found'
            })
        }

        await User.findByIdAndDelete(userId).exec(() => {
            return res.status(200).json({
                msg: 'Account deleted'
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}

// Protected - Patch - Edit user

exports.editUser = async (req, res) => {
    const {
        name,
        dob,
        mobileNumber
    } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    try {
        const user = await User.findById(req.userId)
        user.name = name
        if (dob) {
            user.dob = dob
        }
        if (mobileNumber) {
            user.mobileNumber = mobileNumber
        }
        await user.save()

        return res.status(200).json({
            msg: 'Profile details updated',
            user: user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}

exports.addToCart = async (req, res) => {
    const productId = req.params.productid;
    try {
        const user = await User.findById(req.userId)
        const product = user.cart.find(item => productId === item.product.toString())

        if (product) {
            const index = user.cart.findIndex(item => productId === item.product.toString())

            user.cart[index].qty = user.cart[index].qty + 1;
            await user.save();
            return res.status(200).json({
                msg: 'Product added to cart',
                cart: user.cart
            })
        } else {
            user.cart.push({
                product: productId,
                qty: 1
            })
            await user.save()
            return res.status(200).json({
                msg: 'Product added to cart',
                cart: user.cart
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}

exports.removeFromCart = async (req, res) => {
    const productId = req.params.productid;
    try {
        const user = await User.findOneAndUpdate({
            _id: req.userId
        }, {
            "$pull": {
                "cart": {
                    "product": productId
                }
            }
        }, {
            safe: true,
            multi: true
        }, (err, obj) => {
            if (err) return res.status(422).json({
                msg: 'Something went wrong'
            })
            return res.status(200).json({
                msg: 'Product removed from cart',
                cart: obj.cart
            })
        })

    } catch (error) {
        console.log(error.kind)
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}
exports.updateQty = async (req, res) => {
    const productId = req.params.productid;
    const qty = req.body.qty
    try {
        const user = await User.findOneAndUpdate({
            _id: req.userId,
            "cart.product": productId
        }, {
            "$set": {
                "cart.$.qty": qty
            }
        }, (err, user) => {
            if (err) return res.status(422).json({
                msg: 'Something went wrong'
            })
            return res.status(200).json({
                cart: user.cart
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}

exports.postMessage = async (req, res) => {
    const {
        name,
        email,
        phone,
        messege
    } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }
    try {
        const newMessage = new Messege({
            name,
            email,
            messege,
            phone
        })

        await newMessage.save();

        return res.status(200).json({
            msg: 'Hey thanks for reaching out. We will get back to you soon.'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}

exports.postAddAddress = async (req, res) => {
    const {
        roomno,
        hostel,
        name,
        contact,
        block
    } = req.body;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {

        const newAddress = {
            name,
            roomno,
            contact,
            hostel,
            block
        }
        const user = await User.findById(req.userId)

        user.address.push({
            name,
            roomno,
            contact,
            hostel,
            block
        })

        await user.save();

        return res.status(200).json({
            msg: 'Address added',
            user: user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }

}

exports.removeAddress = async (req, res) => {
    const addressId = req.params.addressid;

    try {
        await User.findOneAndUpdate({
            _id: req.userId
        }, {
            "$pull": {
                "address": {
                    "_id": addressId
                }
            }
        }, {
            new: true,
            safe: true,
            multi: true
        }, (err, user) => {
            if (err) return res.status(422).json({
                msg: 'Something went wrong'
            })
            return res.status(200).json({
                msg: 'Address Removed',
                user: user
            })

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}

exports.editAddress = async (req, res) => {
    const addressId = req.params.addressid
    const {
        roomno,
        hostel,
        name,
        contact,
        block
    } = req.body;
    console.log(req.body)
    try {
        const user = await User.findById(req.userId)


        const index = user.address.findIndex(item => item._id.toString() === addressId)
        console.log(index)
        user.address[index].name = name;
        user.address[index].contact = contact;
        user.address[index].block = block;
        user.address[index].roomno = roomno;
        user.address[index].hostel = hostel;

        await user.save()

        res.status(200).json({
            msg: 'Address updated',
            user: user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}