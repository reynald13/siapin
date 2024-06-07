const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', questionController.getQuestions);
router.post('/', authMiddleware, adminMiddleware, questionController.createQuestion);
router.delete('/:id', authMiddleware, adminMiddleware, questionController.deleteQuestion);

module.exports = router;