import express from 'express';
import Question from '../controllers/questionController';
import Answer from '../controllers/answerController';
import validateAnswer from '../middlewares/validateAnswer';

const { check } = require('express-validator/check');

const router = express.Router();

router.get('/', (req, res) => res.send('Successful!, Welcome to LiteStack API v2!'));
router.get('/questions', Question.GetAllQuestions);
router.get('/questions/:id', Question.GetOneQuestion);
router.post('/questions/:id/answer', validateAnswer, Answer.setAnswer);
router.post('/questions',
  [
    check('title').isLength({ min: 8 }).withMessage('must be at least 8 chars long'),
    check('body').isLength({ min: 16 }).withMessage('must be at least 16 chars long'),
  ],
  Question.setQuestion);

export default router;
