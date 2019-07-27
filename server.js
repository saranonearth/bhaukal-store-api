const app = require('express')();
const PORT = process.env.PORT || 4000;
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const connectDB = require('./DB/db');

connectDB();

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.send('BhaukalStore Api Running')
})

app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`Api running in ${PORT}`)
})