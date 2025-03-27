import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const BASE_API_URL="http://QuizByte-env.eba-bdauijyh.ap-south-1.elasticbeanstalk.com";

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (!storedUsername) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  // Fetch quizzes from the backend
  useEffect(() => {
    axios.get(`${BASE_API_URL}/api/quizzes`)
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  // Delete a quiz
  const handleDelete = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await axios.delete(`${BASE_API_URL}/api/quizzes/quiz/${quizId}`);
        setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  // Redirect to edit quiz page
  const handleEdit = (quizId) => {
    navigate(`/edit-quiz/${quizId}`);
  };

  // Redirect to view results page
  const handleViewResults = (quizId) => {
    navigate(`/quiz-results/${quizId}`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-orange-500 to-orange-100">
      {/* Header */}
      <h1 className="text-4xl font-bold text-white mt-6">Admin Dashboard</h1>
      <button 
        onClick={() => handleLogout()}
        className="text-white mt-2 underline hover:text-gray-200"
      >
        Admin Logout
      </button>

      {/* Quiz Management Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-2/3">
        <h2 className="text-2xl font-semibold text-orange-600 text-center">Manage Quizzes</h2>

        <ul className="mt-4 space-y-3">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <li key={quiz.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow">
                <span className="text-lg font-medium">{quiz.title}</span>
                <div className="space-x-3">
                  <button 
                    onClick={() => handleEdit(quiz.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(quiz.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button 
                    onClick={() => handleViewResults(quiz.id)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                  >
                    View Results
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-600 text-center">No quizzes available.</p>
          )}
        </ul>

        {/* Add New Quiz Button */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => navigate("/add-quiz")}
            className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add New Quiz
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-orange-800">© 2025 Online Quiz App. All rights reserved.</footer>
    </div>
  );
}
