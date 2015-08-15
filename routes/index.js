var express = require('express');
var router = express.Router();

var quizzController = require("../controllers/quizz_controller");
var commentController = require("../controllers/comment_controller");
var sessionController = require("../controllers/session_controller");

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
router.param('commentId', commentController.load);

router.get('/login', 				sessionController.new);
router.post('/login', 			sessionController.create);
router.get('/logout', 				sessionController.destroy);

router.get('/quizzes', 												quizzController.index);
router.get('/quizzes/:quizzId(\\d+)', 				quizzController.show);
router.get('/quizzes/:quizzId(\\d+)/answer', 	quizzController.answer);
router.get('/quizzes/new', 										sessionController.loginRequired, quizzController.new);
router.post('/quizzes/create', 								sessionController.loginRequired, quizzController.create);
router.get('/quizzes/:quizzId(\\d+)/edit', 		sessionController.loginRequired, quizzController.edit);
router.put('/quizzes/:quizzId(\\d+)', 				sessionController.loginRequired, quizzController.update);
router.delete('/quizzes/:quizzId(\\d+)', 			sessionController.loginRequired, quizzController.destroy);

// rutas de comentarios
router.get('/quizzes/:quizzId(\\d+)/comments/new', 			commentController.new);
router.post('/quizzes/:quizzId(\\d+)/comments/create', 	commentController.create);
router.put('/quizzes/:quizzId(\\d+)/comments/:commentId/publish', 	sessionController.loginRequired, commentController.publish);

module.exports = router;
