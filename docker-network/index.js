const express = require('express');
const app = express();
const User = require('./model');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json());

mongoose.connect('mongodb://mongo:27017/test-network',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,  // Helps with connection stability
        serverSelectionTimeoutMS: 5000, // Reduce timeout
    }
).then(() => {
    console.log('Connected to MongoDB', );
}).catch(() => {
    console.log('Error connecting to MongoDB');
})

app.post('/add', async(req, res) => {
    const {name} = req.body;
    const user = await User.create({name});
    res.json(user);
})

app.get('/users', async(req, res) => {
    const users = await User.find();
    res.json({message: 'Hello', users});
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});