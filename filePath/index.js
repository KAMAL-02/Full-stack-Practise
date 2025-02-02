const path = require('path');   // Path module is a built-in module in Node.js that provides utilities for working with file and directory paths
const fs = require('fs');  // File System module is a built-in module in Node.js that provides file I/O functionality

console.log("Current path is:", path.dirname(__filename))  // Gives us the current directory path
console.log("Current file name is:", path.basename(__filename)) // Gives us the current file name
console.log("Current file extension is:", path.extname(__filename)) // Gives us the current file extension
console.log("Current file name without extension is:", path.basename(__filename, path.extname(__filename))) // Gives us the current file name without extension
console.log("Current directory is:", path.dirname(__dirname)) // Gives us the current directory

const joinPath = path.join(__dirname, 'test'); //first argument is the current directory, the rest are the paths we want to join
console.log("Join path is:", joinPath) // Joins the paths together

if(!fs.existsSync(joinPath)){
  const createdDir = fs.mkdirSync(joinPath); // Creates a directory
  console.log("Directory created")
}

const filePath = path.join(joinPath, 'test.txt');
if(!fs.existsSync(filePath)){
  fs.writeFileSync(filePath, 'Hello World!'); // Creates a file and writes to it
  console.log("File created")
}

const fileData = fs.readFileSync(filePath, 'utf-8'); // Reads the file
console.log("File data is:", fileData)

fs.appendFileSync(filePath, '\nThis is a new line!'); // Appends to the file


//! Call back way
const newFilePath = path.join(joinPath, 'newTest.txt');
const callbackway = () => {
    fs.writeFile(newFilePath, "Hello world in callback way", (err)=>{
    if(err) throw err;
    console.log("File created in callback way")
  
    fs.readFile(newFilePath, 'utf-8', (err, data)=>{
      if(err) throw err;
      console.log("File data in callback way is:", data)
    })
    fs.appendFile(newFilePath, '\nThis is a new line in callback way!', (err)=>{
      if(err) throw err;
      console.log("File appended in callback way")
    })
    fs.readFile(newFilePath, 'utf-8', (err, data)=>{
      if(err) throw err;
      console.log("File data in callback way is:", data)
    })
  })
}

callbackway();