import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const BASE_API_URL="http://QuizByte-env.eba-bdauijyh.ap-south-1.elasticbeanstalk.com";

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username"); // Get username from sessionStorage
    if (!storedUsername) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/results/user/${storedUsername}`);
        setResults(response.data);
      } catch (err) {
        setError("Failed to load results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading results...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Your Quiz Results</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        {results.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Quiz Title</th>
                  <th className="py-3 px-4 text-left">Score (%)</th>
                  <th className="py-3 px-4 text-left">Attempt Time</th>

                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-semibold text-orange-500">{result.quizTitle}</td>
                    <td className="py-3 px-4">{result.score}%</td>
                    <td className="py-3 px-4">{new Date(result.attemptTime).toLocaleString()}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No quiz attempts found.</p>
        )}
      </div>
    </div>
  );
}
