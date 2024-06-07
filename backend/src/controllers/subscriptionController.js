const Subscription = require('../models/Subscription');

// Get all subscriptions
exports.getSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.json(subscriptions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Create a subscription
exports.createSubscription = async (req, res) => {
    const {
        name,
        benefits,
        price,
        duration
    } = req.body;
    try {
        const newSubscription = new Subscription({
            name,
            benefits,
            price,
            duration
        });
        await newSubscription.save();
        res.json(newSubscription);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a subscription
exports.deleteSubscription = async (req, res) => {
    try {
        await Subscription.findByIdAndDelete(req.params.id);
        res.json({
            msg: 'Subscription removed'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};