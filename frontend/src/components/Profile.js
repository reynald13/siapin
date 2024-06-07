import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get('/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err.response.data);
            }
        };
        fetchProfile();
    }, []);

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.put('/api/profile', user, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Profile updated successfully');
        } catch (err) {
            console.error(err.response.data);
            setMessage('Error updating profile');
        }
    };

    return loading ? <p>Loading...</p> : (
        <div>
            <h2>Profile</h2>
            {message && <p>{message}</p>}
            <form onSubmit={onSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={user.name} onChange={onChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={user.email} onChange={onChange} required />
                </label>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;