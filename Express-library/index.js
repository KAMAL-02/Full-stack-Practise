const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

let books = [
    { id: 1, title: "Book One", author: "Author A", isbn: "1111111111" },
    { id: 2, title: "Book Two", author: "Author B", isbn: "2222222222"}
];

app.use((req, res, next) => {
    console.log(`[${new Date()}] ${req.method} ${req.url}`);
    next();
});

app.get('/',(req, res)=>{
    res.send('Hello World');
})

app.post('/books',(req, res)=>{
    const { title, author, isbn } = req.body; 

    if(!title || !author || !isbn){
        res.status(400).send('Please provide all the required fields');
    }

    const existingBook = books.find(book => book.isbn === isbn);
    if(existingBook){
        res.status(400).send('Book already exists');
    }else{
        const newBook = {
            id: uuidv4(),
            title,
            author,
            isbn
        }
        books.push(newBook);
        res.status(201).send(newBook);
    }
});

app.get('/books', (req, res)=>{
    const { title, author} = req.query;

    let filteredBooks = books;

    if(author){
        let filteredBooks = books.filter(book => book.author === author)
        return res.json(filteredBooks);
    }

    return res.json(filteredBooks);
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000'); 
})