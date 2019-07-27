const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    validationResult
} = require('express-validator');

exports.postSignup = async (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {
        //user check
        let user = await User.findOne({
            email
        })
        if (user) {
            return res.status(422).json({
                msg: 'User already exist'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await new User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()

        const payload = {
            userId: newUser._id
        }

        const token = await jwt.sign(payload, process.env.TOKENSEC, {
            expiresIn: '1h'
        })

        if (token) {
            return res.status(200).json({
                msg: 'Signup successful',
                token: token
            })
        } else {
            return res.status(401).json({
                msg: 'Signup failed'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }

};

exports.postSignin = async (req, res) => {
    const {
        email,
        password
    } = req.body


    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    try {
        //check is user exist
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(401).json({
                msg: 'User does not exist'
            })
        }
        //password check

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                msg: 'Incorrect email or password'
            })
        }

        const payload = {
            userId: user._id
        }
        const token = await jwt.sign(payload, process.env.TOKENSEC, {
            expiresIn: '1h'
        })

        if (token) {
            return res.status(200).json({
                msg: 'Login successful',
                token: token
            })
        } else {
            return res.json(401).json({
                msg: 'Login failed'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server Error'
        })
    }
}