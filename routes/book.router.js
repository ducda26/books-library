var express = require('express');
var router = express.Router();

var db=require('../db')
const controller = require('../controllers/book.controller')

router.get('/', controller.index)

router.get('/create', controller.create)

router.post('/create', controller.postCreate)

router.get('view/:id', controller.get)

router.get('/:id/delete', controller.delete)

router.get('/search', controller.search)

router.get("/:id/update", controller.update)

router.post("/update", controller.postUpdate)

module.exports = router