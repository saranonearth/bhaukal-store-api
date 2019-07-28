const User = require('../models/user');
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