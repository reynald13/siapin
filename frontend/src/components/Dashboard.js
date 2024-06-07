import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };
    
        fetchUser();
    }, []);
    
    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <p>Subscription Plan: {user.subscription.plan}</p>
                    <p>Expires on: {new Date(user.subscription.expires).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;