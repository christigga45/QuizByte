import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function QuizResults() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const [results, setResults] = useState([]);

  const BASE_API_URL="http://QuizByte-env.eba-bdauijyh.ap-south-1.elasticbeanstalk.com";

  useEffect(() => {
    // Fetch quiz details to get the title
    axios.get(`BASE_API_URL/api/quizzes/${quizId}`)
      .then((response) => setQuizTitle(response.data.title))
      .catch((error) => console.error("Error fetching quiz title:", error));
  
    // Fetch quiz results
    axios.get(`${BASE_API_URL}/api/results/quiz/${quizId}`)
      .then((response) => {
        // Sort results by score (descending order)
        const sortedResults = response.data.sort((a, b) => b.score - a.score);
        setResults(sortedResults);
      })
      .catch((error) => console.error("Error fetching quiz results:", error));
  }, [quizId]);
  

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-purple-500 to-indigo-500">
      {/* Header */}
      <h1 className="text-3xl font-bold text-white mt-6">Quiz Results</h1>
      <h2 className="text-xl text-white mt-2">{quizTitle}</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-2/3">
        <h3 className="text-2xl font-semibold text-indigo-600 text-center">User Scores</h3>

        <table className="w-full mt-4 border border-gray-300">
          <thead>
            <tr className="bg-indigo-200">
              <th className="p-3 border">Rank</th>
              <th className="p-3 border">Username</th>
              <th className="p-3 border">Score</th>
              <th className="p-3 border">Attempt Time</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((result, index) => (
                <tr key={result.id} className="text-center border">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{result.username}</td>
                  <td className="p-3 border font-bold text-green-600">{result.score}%</td>
                  <td className="p-3 border">{new Date(result.attemptTime).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-600">
                  No results available for this quiz.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-6">
          <button 
            onClick={() => navigate("/admin-dashboard")}
            className="px-6 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
