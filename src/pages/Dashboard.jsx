import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (!storedUsername) {
      navigate("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-500 to-orange-300">
      <h1 className="text-4xl font-bold text-white mb-6">Welcome, {username}!</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-orange-500 mb-4">Dashboard</h2>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/quizzes")}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all font-medium"
          >
            View Quizzes
          </button>

          <button
            onClick={() => navigate("/user-results")}
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all font-medium"
          >
            View My Results
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-all font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
