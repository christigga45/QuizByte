import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Quizzes from "./pages/Quizzes";
import QuizAttempt from "./pages/QuizAttempt";
import Results from "./pages/Results";
import "./index.css"; // Make sure Tailwind styles are applied
import ViewResults from "./pages/ViewResults";
import AdminDashboard from "./pages/AdminDashboard";
import AddQuiz from "./pages/AddQuiz";
import EditQuiz from "./pages/EditQuiz";
import QuizResults from "./pages/QuizResults";

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/edit-quiz/:quizId" element={<EditQuiz />} />
        <Route path="/quiz-results/:quizId" element={<QuizResults />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/attempt-quiz/:quizId" element={<QuizAttempt />} />
        <Route path="/results/quiz/:quizId" element={<Results />} />
        <Route path="/user-results" element={<ViewResults/>} />
      </Routes>
    </Router>
  );
}

export default App;
