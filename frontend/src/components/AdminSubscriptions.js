import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [newSub, setNewSub] = useState({ name: '', benefits: '', price: '', duration: '' });

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

    const onChange = e => setNewSub({ ...newSub, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/subscriptions', newSub, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSubscriptions([...subscriptions, res.data]);
            setNewSub({ name: '', benefits: '', price: '', duration: '' });
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const deleteSubscription = async id => {
        try {
            await axios.delete(`/api/subscriptions/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSubscriptions(subscriptions.filter(sub => sub._id !== id));
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h2>Admin: Manage Subscriptions</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newSub.name}
                    onChange={onChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="benefits"
                    value={newSub.benefits}
                    onChange={onChange}
                    placeholder="Benefits (comma separated)"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={newSub.price}
                    onChange={onChange}
                    placeholder="Price"
                    required
                />
                <input
                    type="number"
                    name="duration"
                    value={newSub.duration}
                    onChange={onChange}
                    placeholder="Duration (days)"
                    required
                />
                <button type="submit">Add Subscription</button>
            </form>
            <ul>
                {subscriptions.map(sub => (
                    <li key={sub._id}>
                        <h3>{sub.name}</h3>
                        <p>{sub.benefits.join(', ')}</p>
                        <p>Price: ${sub.price}</p>
                        <p>Duration: {sub.duration} days</p>
                        <button onClick={() => deleteSubscription(sub._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminSubscriptions;