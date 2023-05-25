const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.send('welcome from 🌎 with love');
});

app.get('/books', (req, res) => {
    res.send('welcome from 📚');
});




app.listen(8000, ()=>{
    console.log('server is listenining boi 👦👦👦👦👦');
})