import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as db from '../../Database';

const QuizTypeSelector = () => {
    const { cid, qid } = useParams();
    const quizzes = db.default.quizzes;

    // Find the quiz based on the qid
    const quiz = quizzes.find(quiz => quiz._id === qid);

    // Use useEffect to set the state based on quiz
    const [selectedQuizType, setSelectedQuizType] = useState('');

    useEffect(() => {
        // Set the selected quiz type if quiz is found
        if (quiz) {
            setSelectedQuizType(quiz.quizType || '');
        }
    }, [quiz]);

    // Handle change event for the dropdown
    const handleQuizTypeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedQuizType(event.target.value);
        // Update quiz.quizType or perform other actions as needed
        // e.g., quiz.quizType = event.target.value; // Update if directly modifying
    };

    return (
        <div className="mb-4">
            <select 
                id="quiz-type" 
                className="form-select" 
                value={selectedQuizType} 
                onChange={handleQuizTypeChange} 
            >
                <option value="">Choose a quiz type</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
                {/* Add more options as needed */}
            </select>
        </div>
    );
};

export default QuizTypeSelector;
