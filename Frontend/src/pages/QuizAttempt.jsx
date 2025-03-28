import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizAttempt = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [username, setUsername] = useState("");

  const BASE_API_URL="http://QuizByte-env.eba-bdauijyh.ap-south-1.elasticbeanstalk.com";

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username"); // Retrieve logged-in username
    if (storedUsername) {
      setUsername(storedUsername); // Store in state
    }
  }, []);
  

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/questions/quiz/${quizId}`);
        setQuizTitle(response.data.title);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    if (!username) {
      console.error("Error: No username found!");
      return;
    }
  
    console.log("Submitting answers:", answers);
    console.log("Username:", username);
    console.log("Quiz ID:", quizId);
  
    try {
      const response = await axios.post(`${BASE_API_URL}/api/results/submit`, {
        username,  // Use username instead of userId
        quizId,
        answers,
      });
  
      console.log("Response from backend:", response.data);
      const resultData = response.data;
      navigate(`/results/quiz/${quizId}`, { state: resultData });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h2 className="mt-6 text-3xl font-bold text-orange-600">Quiz: {quizTitle}</h2>

      <div className="w-full max-w-3xl mt-6">
        {questions.length === 0 ? (
          <p className="text-gray-600 text-center">No questions available</p>
        ) : (
          questions.map((question, index) => (
            <div key={question.id} className="bg-white p-5 rounded-lg shadow-lg mb-4">
              <h3 className="text-lg font-bold text-orange-700 mb-3">
                {index + 1}. {question.questionText}
              </h3>
              <div className="space-y-2">
                {[question.option1, question.option2, question.option3, question.option4].map(
                  (option, optIndex) => (
                    <label key={optIndex} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() => handleAnswerChange(question.id, option)}
                        className="accent-orange-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizAttempt;
