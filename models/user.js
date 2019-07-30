const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        default: null
    },
    mobileNumber: {
        type: String,
        default: null
    },
    address: [{
        name: String,
        roomno: String,
        hostel: String,
        contact: String,
        block: String
    }],
    cart: [{
        product: Schema.Types.ObjectId,
        qty: Number
    }],
    onboard: {
        type: Boolean,
        default: true
    },
    profilePicture: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    }

}, {
    timestamps: true
})

module.exports = User = mongoose.model('users', UserSchema)