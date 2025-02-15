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

const postSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // author is a reference to a User
  });

// Add an index to the "username" field
userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = User;