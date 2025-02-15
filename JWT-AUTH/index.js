const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());    

const secret = "Kamal1234"

app.post("/signup", (req, res)=>{
    const {username, password} = req.body;
    const token = jwt.sign({username}, secret);



    res.json({token});
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})

// let promise1 = new promise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve("Hello world");
//     })
// })

// let promise2 = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve("Hello world");
//     })
// })

// Promise.all([promise1, promise2])
// .then(()=>{
//     console.log("All promises resolved");
// })