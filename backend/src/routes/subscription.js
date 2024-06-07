const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); // Middleware to check if user is admin

router.get('/', subscriptionController.getSubscriptions);
router.post('/', authMiddleware, adminMiddleware, subscriptionController.createSubscription);
router.delete('/:id', authMiddleware, adminMiddleware, subscriptionController.deleteSubscription);

module.exports = router;