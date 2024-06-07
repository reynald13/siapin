const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    benefits: {
        type: Array,
        default: []
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    } // Duration in days
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);