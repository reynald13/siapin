import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
        question: '',
        options: '',
        correctAnswer: '',
        category: '',
        difficulty: ''
    });

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get('/api/questions');
                setQuestions(res.data);
            } catch (err) {
                console.error(err.response.data);
            }
        };
        fetchQuestions();
    }, []);

    const onChange = e => setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/questions', newQuestion, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions([...questions, res.data]);
            setNewQuestion({ question: '', options: '', correctAnswer: '', category: '', difficulty: '' });
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const deleteQuestion = async id => {
        try {
            await axios.delete(`/api/questions/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setQuestions(questions.filter(q => q._id !== id));
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h2>Admin: Manage Questions</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="question"
                    value={newQuestion.question}
                    onChange={onChange}
                    placeholder="Question"
                    required
                />
                <input
                    type="text"
                    name="options"
                    value={newQuestion.options}
                    onChange={onChange}
                    placeholder="Options (comma separated)"
                    required
                />
                <input
                    type="text"
                    name="correctAnswer"
                    value={newQuestion.correctAnswer}
                    onChange={onChange}
                    placeholder="Correct Answer"
                    required
                />
                <input
                    type="text"
                    name="category"
                    value={newQuestion.category}
                    onChange={onChange}
                    placeholder="Category"
                    required
                />
                <input
                    type="text"
                    name="difficulty"
                    value={newQuestion.difficulty}
                    onChange={onChange}
                    placeholder="Difficulty"
                    required
                />
                <button type="submit">Add Question</button>
            </form>

            <h3>Existing Questions</h3>
            <ul>
                {questions.map(question => (
                    <li key={question._id}>
                        <h4>{question.question}</h4>
                        <p>Options: {question.options.join(', ')}</p>
                        <p>Correct Answer: {question.correctAnswer}</p>
                        <p>Category: {question.category}</p>
                        <p>Difficulty: {question.difficulty}</p>
                        <button onClick={() => deleteQuestion(question._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminQuestions;