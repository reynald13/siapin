import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const res = await axios.get('/api/subscriptions');
                setSubscriptions(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };
        fetchSubscriptions();
    }, []);

    return (
        <div>
            <h2>Subscription Plans</h2>
            <ul>
                {subscriptions.map(sub => (
                    <li key={sub._id}>
                        <h3>{sub.name}</h3>
                        <p>{sub.benefits.join(', ')}</p>
                        <p>Price: ${sub.price}</p>
                        <p>Duration: {sub.duration} days</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Subscriptions;