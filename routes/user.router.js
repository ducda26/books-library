var express = require('express');
var router = express.Router();

var db=require('../db')
const controller = require('../controllers/user.controller')

router.get('/', controller.index)

router.get('/create', controller.create)


router.post('/create', controller.postCreate)

router.get('view/:id', controller.get)

router.get("/:id/update", controller.update)

router.post(":id/update", controller.postUpdate)


router.get('/:id/delete', controller.delete)
router.get('/search', controller.search)

module.exports = router