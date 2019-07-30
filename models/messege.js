const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const messegeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    messege: {
        type: String,
        required: true
    },
    attended: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = Messege = mongoose.model('messeges', messegeSchema);