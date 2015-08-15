var express = require('express');
var router = express.Router();

var quizzController = require("../controllers/quizz_controller");
var commentController = require("../controllers/comment_controller");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Quizz',
  	errors: [],
  });
});
router.get('/author', function(req, res, next){
	res.render('author',{
		errors:[],
	});
});

router.param('quizzId', quizzController.load);

router.get('/quizzes', 												quizzController.index);
router.get('/quizzes/:quizzId(\\d+)', 				quizzController.show);
router.get('/quizzes/:quizzId(\\d+)/answer', 	quizzController.answer);
router.get('/quizzes/new', 										quizzController.new);
router.post('/quizzes/create', 								quizzController.create);
router.get('/quizzes/:quizzId(\\d+)/edit', 		quizzController.edit);
router.put('/quizzes/:quizzId(\\d+)', 				quizzController.update);
router.delete('/quizzes/:quizzId(\\d+)', 			quizzController.destroy);

// rutas de comentarios
router.get('/quizzes/:quizzId(\\d+)/comments/new', 			commentController.new);
router.post('/quizzes/:quizzId(\\d+)/comments/create', 	commentController.create);

module.exports = router;
