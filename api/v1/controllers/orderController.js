import questions from '../models/questions';

const { validationResult } = require('express-validator/check');

export default class Questions {
  static async GetAllQuestions(req, res) {
    try {
      return await res.json(questions);
    } catch (err) {
      res.status(404).json({ message: 'Question not found!', err });
    }
  }

  static async GetOneQuestion(req, res) {
    try {
      const questionId = await req.params.id;
      const questionItem = await questions
        .filter(question => question.id == questionId)[0];
      if (typeof questionItem === 'undefined') {
        res.status(404).json({ message: 'Question does not exist!' });
      }
      return res.status(200).json(questionItem);
    } catch (err) {
      res.status(500).json({ message: 'Sorry about that, not available', err });
    }
  }

  static setQuestion(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ });
    }
    const question = {
      id: questions.length + 1,
      title: req.body.title,
      body: req.body.body,
    };
    questions.push(question);
    res.status(201).json({ message: 'Question was created successfully', data: questions });
  }
}
