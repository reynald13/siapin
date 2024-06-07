const express = require('express');
const router = express.Router();
const UserPerformance = require('../models/UserPerformance');

// Save user performance
router.post('/', async (req, res) => {
  const { score, totalQuestions } = req.body;
  const userId = req.user.id; // Assuming you have user ID from authentication

  const userPerformance = new UserPerformance({
    userId,
    score,
    totalQuestions,
    date: new Date()
  });

  try {
    const newUserPerformance = await userPerformance.save();
    res.status(201).json(newUserPerformance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;