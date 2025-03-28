import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_API_URL="http://QuizByte-env.eba-bdauijyh.ap-south-1.elasticbeanstalk.com";
 

    const handleLogin = async (e) => {
      e.preventDefault();
      setError(""); // Clear errors
    
      try {
        const response = await axios.post(`${BASE_API_URL}/api/users/login`, {
          username,
          password,
        });
    
        if (response.data.status === "success") {
          sessionStorage.setItem("username", username);
    
          // SIMPLE CHECK: If the username is "admin", redirect to admin dashboard
          if (username === "admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/dashboard");
          }
        }
      } catch (err) {
        setError("Invalid username or password.");
      }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-500 to-orange-300">
      <h1 className="text-4xl font-bold text-white mb-6">Login to QuizByte</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-orange-500 text-center mb-4">Welcome Back!</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all font-medium"
          >
            Login
          </button>
        </form>
      </div>

      <p className="text-white mt-4">
        Don't have an account?{" "}
        <span 
          className="underline cursor-pointer hover:text-gray-200"
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
}
