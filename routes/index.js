var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quizz_controller.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quizz' });
});
router.get('/author', function(req, res, next){
	res.render('author');
});

router.get('/quizzes/question', quizController.question);
router.get('/quizzes/answer', quizController.answer);

module.exports = router;
