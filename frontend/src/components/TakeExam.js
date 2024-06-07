import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TakeExam = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [submitted, setSubmitted] = useState(false);

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

    const handleAnswerChange = (e) => {
        setAnswers({
            ...answers,
            [questions[currentQuestionIndex]._id]: e.target.value
        });
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleSubmit = async () => {
        let correctAnswers = 0;

        questions.forEach((question) => {
            if (answers[question._id] === question.correctAnswer) {
                correctAnswers += 1;
            }
        });

        setScore(correctAnswers);
        setSubmitted(true);

        // Save user performance data
        try {
            await axios.post('/api/user-performance', {
                score: correctAnswers,
                totalQuestions: questions.length
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
        } catch (err) {
            console.error(err.response.data);
        }
    };

    if (!questions.length) return <p>Loading questions...</p>;

    if (submitted) {
        return (
            <div>
                <h2>Exam Completed</h2>
                <p>Your score: {score} out of {questions.length}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Take Exam</h2>
            <div>
                <p>{questions[currentQuestionIndex].question}</p>
                {questions[currentQuestionIndex].options.map((option, index) => (
                    <div key={index}>
                        <label>
                            <input
                                type="radio"
                                name="answer"
                                value={option}
                                onChange={handleAnswerChange}
                            />
                            {option}
                        </label>
                    </div>
                ))}
            </div>
            <div>
                {currentQuestionIndex > 0 && (
                    <button onClick={handlePreviousQuestion}>Previous</button>
                )}
                {currentQuestionIndex < questions.length - 1 ? (
                    <button onClick={handleNextQuestion}>Next</button>
                ) : (
                    <button onClick={handleSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
};

export default TakeExam;