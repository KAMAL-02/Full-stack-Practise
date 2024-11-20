const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models");
const bcrypt = require("bcrypt");

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Working",
  });
});

//! Register a user
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter username or password" });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(200).json({ 
        msg: "User registered successfully" ,
        user: newUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

//! Get all users
app.get('/users', async(req, res)=>{
    try {
        const users = await User.find({}, 'username'); //! Second parameter is projection to only get username
        if(!users){
            return res.status(404).json({msg: "No users found"});
        }
        return res.status(200).json({users});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
})

//! Update a user
app.put("/users/:id", async(req, res)=>{
  const { id }  = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findOne({_id: id})
    if(!user){
      return res.status(404).json({msg: "User not found"});
    }
    if(user){
      user.username = username;
    }
    if(password){
      const saltrounds = 10;
      user.password = await bcrypt.hash(password, saltrounds);
    }
    await user.save();
    return res.status(200).json({msg: "User updated successfully"});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
