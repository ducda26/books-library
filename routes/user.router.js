var express = require('express');
var router = express.Router();
const shortid = require('shortid')

var db=require('../db')

router.get('/', function(req, res) {
    res.render('users/index',{
        users: db.get('users').value()
    })
});

router.get('/create', function(req, res) {
    res.render('users/create')
});

router.get('/:id', function(req, res) {
    var id=(req.params.id); //nếu id là số ==> dùng parseInt() chuyển chữ thaanhf số
    var user = db.get('users').find({id: id}).value()
    res.render('users/view',{
        user: user
    })
});

router.get('/:id/delete', function(req, res) {
    db.get("users")
    .remove({ id: req.params.id })
    .write();
     res.redirect("/");
    });

router.post('/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/');
});

router.get('/search', function(req, res) {
    var q = req.query.q; // req.query là một object nên muốn lấy giá trị thì cần phải .p
    console.log(req.query);
    var matchedUser=db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index',{
        users: matchedUser
    })
});

router.get("/:id/update", (req, res) =>{
    let id = req.params.id;
    res.render("users/update",{
        id: id,
        book: db.get("users").find({id: id}).value()
    });
})

router.post("/update", (req, res) =>{
    let id = req.body.id;
    db.get('users').find({id: id}).assign({ name: req.body.name}).write();
    res.redirect("/users");
})

module.exports = router