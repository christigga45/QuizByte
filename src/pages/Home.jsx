import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-500 to-orange-100">
      {/* Header */}
      <h1 className="text-4xl font-bold text-white mb-8">Welcome To QuizByte</h1>

      {/* Role Selection Card */}
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg text-center">
        <h2 className="text-2xl font-semibold text-orange-600 mb-6">Please Select Your Role</h2>

        <div className="flex justify-center space-x-6">
          {/* User Login Card */}
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-xl font-medium text-orange-600">User Login</h3>
            <p className="text-gray-600 text-sm mb-4">Take quizzes and see your results.</p>
            <Link to="/login" className="px-10 py-2 bg-orange-500 text-white font-medium rounded-full transition hover:bg-orange-400">
              Login as User
            </Link>
          </div>

          {/* Admin Login Card */}
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-xl font-medium text-orange-600">Admin Login</h3>
            <p className="text-gray-600 text-sm mb-4">Manage quizzes and questions.</p>
            <Link to="/login" className="px-5 py-2 bg-orange-500 text-white font-medium rounded-full transition hover:bg-orange-400">
              Login as Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-orange-800">
        © 2025 Online Quiz App. All rights reserved.
      </footer>
    </div>
  );
}
