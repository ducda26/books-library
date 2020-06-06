const express = require('express');
const app = express();
const pug = require('pug');
var bodyParser = require('body-parser') //body

app.set('view engine', 'pug')
app.set('views', './views')

var port = 1000
app.use(bodyParser.json()) //body for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) //body for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Chào mừng bạn đến với thư viện sách Anh Đức'
    })  
});

app.get('/users', function(req, res) {
    res.render('users/index',{
        users: [
            {id: 1, name:'Duc', phone: '098678965'},
            {id: 2, name:'Tieu Vy', phone: '07898677'}
        ]
    })
});

app.get('/books', function(req, res) {
    res.render('books/index',{
        books: [
            {id: 1, title:'Muon Kiep Nhan Sinh', description: 'John Vu'},
            {id: 2, title:'Tuong Lai The Gioi', description: 'Vo Dinh'}
        ]
    })
});

app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}`);
});
