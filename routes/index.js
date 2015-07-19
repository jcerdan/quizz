var express = require('express');
var router = express.Router();

var quizzController = require("../controllers/quizz_controller.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quizz' });
});
router.get('/author', function(req, res, next){
	res.render('author');
});

router.get('/quizzes', 												quizzController.index);
router.get('/quizzes/:quizzId(\\d+)', 				quizzController.show);
router.get('/quizzes/:quizzId(\\d+)/answer', 	quizzController.answer);

module.exports = router;
