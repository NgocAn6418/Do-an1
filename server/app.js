const express = require('express');
const app = express()
const PORT = process.env.PORT | 5000
const mongoose = require('mongoose');
const User = require('./models/user.model')
const { MONGOURI } = require('./config/keys')
app.use(express.json())


mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log("Connected to mongo")
})
mongoose.connection.on('error', () => {
    console.log("Failed to connect")
})
app.use(require('./routes/auth.routes'))
app.use(require('./routes/post.routes'))
app.use(require('./routes/other.routes'))
app.get('/', (req, res) => {
    res.send('Hello World')
})
if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
app.listen(PORT, () => {
    console.log('Server is running on', PORT)
})