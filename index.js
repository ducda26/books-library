const express = require('express');
const app = express();
const pug = require('pug');
const bodyParser = require('body-parser') //body
const low = require('lowdb')
const shortid = require('shortid')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
  .write();

db.defaults({ books: []})
  .write();

app.set('view engine', 'pug')
app.set('views', './views')

var port = 1000

app.use(bodyParser.json()) //body for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) //body for parsing application/x-www-form-urlencoded

// var users = [
//     {id: 1, name:'Duc', phone: '098678965'},
//     {id: 2, name:'Tieu Vy', phone: '07898677'},
//     {id: 3, name:'Bay Phon', phone: '654567675'}
// ]

// var books= [
//     {id: 1, title:'Muon Kiep Nhan Sinh', description: 'John Vu'},
//     {id: 2, title:'Tuong Lai The Gioi', description: 'Vo Dinh'},
//     {id: 3, title:'Cuộc phiêu lưu của anh Đức', description: 'Anh Đức'},
//     {id: 4, title:'Mật ngữ rừng xanh', description: 'Lê Hữu Nam'}
// ]

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Chào mừng bạn đến với thư viện sách Anh Đức'
    })  
});

app.get('/users', function(req, res) {
    res.render('users/index',{
        users: db.get('users').value()
    })
});

app.get('/users/create', function(req, res) {
    res.render('users/create')
});

app.get('/users/:id', function(req, res) {
    var id=(req.params.id); //nếu id là số ==> dùng parseInt() chuyển chữ thaanhf số
    var user = db.get('users').find({id: id}).value()
    res.render('users/view',{
        user: user
    })
});

app.get('/users/:id', function(req, res) {
    var id=(req.params.id); //nếu id là số ==> dùng parseInt() chuyển chữ thaanhf số
    var user = db.get('users').find({id: id}).value()
    res.render('users/view',{
        user: user
    })
});


app.get('/users/:id/delete', function(req, res) {
    db.get("users")
    .remove({ id: req.params.id })
    .write();
     res.redirect("/users");
    });

app.post('/users/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.get('/users/search', function(req, res) {
    var q = req.query.q; // req.query là một object nên muốn lấy giá trị thì cần phải .p
    console.log(req.query);
    var matchedUser=db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index',{
        users: matchedUser
    })
});


app.get('/books', function(req, res) {
    res.render('books/index',{
        books: db.get('books').value()
    })
});

app.get('/books/create', function(req, res) {
    res.render('books/create')
});

app.post('/books/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books');
});

app.get('/books/search', function(req, res) {
    var q = req.query.q; // req.query là một object nên muốn lấy giá trị thì cần phải .p
    console.log(req.query);
    var matchedBooks=db.get('books').value().filter(function(book){
        return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1                
    })
    res.render('books/index',{
        books: matchedBooks
    })
});

app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}`);
});
