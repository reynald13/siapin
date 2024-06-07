const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
    const {
        question,
        options,
        correctAnswer,
        category,
        difficulty
    } = req.body;
    try {
        const newQuestion = new Question({
            question,
            options,
            correctAnswer,
            category,
            difficulty
        });
        await newQuestion.save();
        res.json(newQuestion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({
            msg: 'Question deleted'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};