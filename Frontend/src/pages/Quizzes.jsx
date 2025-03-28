import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const BASE_API_URL="http://QuizByte-env.eba-bdauijyh.ap-south-1.elasticbeanstalk.com";

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/quizzes`);
        setQuizzes(response.data); // Assuming response data is an array of quizzes
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizClick = (quizId) => {
    navigate(`/attempt-quiz/${quizId}`); // Redirect to quiz attempt page
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-orange-400 to-gray-100">
      <header className="bg-orange-500 text-white py-6 text-center text-3xl font-semibold">
        Available Quizzes
      </header>

      <main className="flex justify-center items-center flex-grow">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-orange-600 text-3xl font-semibold mb-4">List of Quizzes</h2>
          
          {quizzes.length === 0 ? (
            <p className="text-gray-600">No quizzes available</p>
          ) : (
            <ol className="text-gray-800 space-y-2 text-lg">
              {quizzes.map((quiz) => (
                <li
                  key={quiz.id}
                  className="cursor-pointer hover:text-orange-500 transition duration-200"
                  onClick={() => handleQuizClick(quiz.id)} // Handle click event
                >
                  {quiz.title}
                </li>
              ))}
            </ol>
          )}
        </div>
      </main>

      <footer className="bg-orange-500 text-white text-center py-2">
        © 2025 Online Quiz App
      </footer>
    </div>
  );
};

export default Quizzes;
