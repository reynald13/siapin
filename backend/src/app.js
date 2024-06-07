const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({
    path: '../.env'
});

const authRoutes = require('./routes/auth');
const subscriptionRoutes = require('./routes/subscription');
const questionRoutes = require('./routes/question');
const profileRoutes = require('./routes/profile');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());

console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/questions', authMiddleware, questionRoutes); // Protect question routes
app.use('/api/profile', profileRoutes); // Profile routes

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});