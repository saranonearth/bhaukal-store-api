const mongoose = require('mongoose');

module.exports = function () {
    try {
        mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        console.log('DB Connected')
    } catch (error) {
        console.log('DB connection failed')
    }
}