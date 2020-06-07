var express = require('express');
var router = express.Router();
const shortid = require('shortid')

var db=require('../db')


router.get('/', function(req, res) {
    res.render('books/index',{
        books: db.get('books').value()
    })
});

router.get('/create', function(req, res) {
    res.render('books/create')
});

router.post('/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/');
});

router.get('/:id', function(req, res) {
    var id=(req.params.id); //nếu id là số ==> dùng parseInt() chuyển chữ thaanhf số
    var book = db.get('books').find({id: id}).value()
    res.render('books/view',{
        book: book
    })
});

router.get('/:id/delete', function(req, res) {
    db.get("books")
    .remove({ id: req.params.id })
    .write();
     res.redirect("/");
    });

router.get('/search', function(req, res) {
    var q = req.query.q; // req.query là một object nên muốn lấy giá trị thì cần phải .p
    console.log(req.query);
    var matchedBooks=db.get('books').value().filter(function(book){
        return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1                
    })
    res.render('books/index',{
        books: matchedBooks
    })
});

router.get("/:id/update", (req, res) =>{
    let id = req.params.id;
    res.render("books/update",{
        id: id,
        book: db.get("books").find({id: id}).value()
    });
})

router.post("/update", (req, res) =>{
    let id = req.body.id;
    db.get('books').find({id: id}).assign({ name: req.body.name}).write();
    res.redirect("/books");
})

module.exports = router