const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
});

// Add an index to the "username" field
userSchema.index({ username: 1 }); // Ascending order index on "username"

const User = mongoose.model('User', userSchema);

module.exports = User;