import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log("Received state:", state); // Debugging output

  if (!state) {
    return <p className="text-center text-red-500">Error: No result data found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-orange-600">Quiz Submitted Successfully !!!</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg mt-6 text-center">
        <p className="text-2xl font-semibold text-gray-800">Your Score: {state.score}%</p>
      </div>

      {/* Go Back to Dashboard Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition duration-300"
      >
        Go Back to Dashboard
      </button>
    </div>
  );
};

export default Results;
