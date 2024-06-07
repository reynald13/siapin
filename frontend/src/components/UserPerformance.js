import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPerformance = () => {
    const [performanceData, setPerformanceData] = useState([]);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const res = await axios.get('/api/user-performance', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setPerformanceData(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };
        fetchPerformanceData();
    }, []);

    return (
        <div>
            <h2>User Performance</h2>
            {performanceData.length === 0 ? (
                <p>No performance data available</p>
            ) : (
                <ul>
                    {performanceData.map((entry) => (
                        <li key={entry._id}>
                            <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
                            <p>Score: {entry.score} / {entry.totalQuestions}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserPerformance;