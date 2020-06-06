const express = require('express');
const app = express();
const pug = require('pug');
var bodyParser = require('body-parser') //body

app.set('view engine', 'pug')
app.set('views', './views')

var port = 1000
app.use(bodyParser.json()) //body for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) //body for parsing application/x-www-form-urlencoded

var users = [
    {id: 1, name:'Duc', phone: '098678965'},
    {id: 2, name:'Tieu Vy', phone: '07898677'},
    {id: 3, name:'Bay Phon', phone: '654567675'}
]

var books= [
    {id: 1, title:'Muon Kiep Nhan Sinh', description: 'John Vu'},
    {id: 2, title:'Tuong Lai The Gioi', description: 'Vo Dinh'},
    {id: 3, title:'Cuộc phiêu lưu của anh Đức', description: 'Anh Đức'}
    {id: 4, title:'Mật ngữ rừng xanh', description: 'Lê Hữu Nam'}
]

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Chào mừng bạn đến với thư viện sách Anh Đức'
    })  
});

app.get('/users', function(req, res) {
    res.render('users/index',{
        users: users
    })
});

app.get('/users/search', function(req, res) {
    var q = req.query.q; // req.query là một object nên muốn lấy giá trị thì cần phải .p
    console.log(req.query);
    var matchedUser=users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index',{
        users: matchedUser
    })
});

app.get('/books', function(req, res) {
    res.render('books/index',{
        books: books
    })
});

app.get('/books/search', function(req, res) {
    var q = req.query.q; // req.query là một object nên muốn lấy giá trị thì cần phải .p
    console.log(req.query);
    var matchedBooks=books.filter(function(book){
        return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('books/index',{
        books: matchedBooks
    })
});

app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}`);
});
