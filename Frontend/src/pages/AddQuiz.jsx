import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddQuiz() {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const BASE_API_URL="http://QuizByte-env.eba-bdauijyh.ap-south-1.elasticbeanstalk.com";


  

  const navigate = useNavigate();

  const handleAddQuestion = () => {
    if (
      currentQuestion.questionText.trim() === "" ||
      currentQuestion.correctAnswer.trim() === "" ||
      currentQuestion.options.some((opt) => opt.trim() === "")
    ) {
      alert("Please fill in all fields before adding the question.");
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ questionText: "", options: ["", "", "", ""], correctAnswer: "" });
  };

  const handleCreateQuiz = async () => {
    if (quizTitle.trim() === "" || quizDescription.trim() === "" || questions.length === 0) {
      alert("Please provide a title, description, and at least one question.");
      return;
    }
    const formattedQuestions = questions.map((q) => ({
      questionText: q.questionText,
      option1: q.options[0],
      option2: q.options[1],
      option3: q.options[2],
      option4: q.options[3],
      correctAnswer: q.correctAnswer
    }));

    try {
      const response = await axios.post(`${BASE_API_URL}/api/quizzes`, {
        title: quizTitle,
        description: quizDescription,
        questions: formattedQuestions,
      });

      if (response.status === 200) {
        alert("Quiz created successfully!");
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-orange-600 text-center">Create a New Quiz</h1>

        {/* Quiz Title */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium">Quiz Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter quiz title..."
          />
        </div>

        {/* Quiz Description */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">Quiz Description</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            placeholder="Enter a short description..."
            rows="3"
          />
        </div>

        {/* Questions Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">Add Questions</h2>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <label className="block text-gray-700 font-medium">Question</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              value={currentQuestion.questionText}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
              placeholder="Enter question..."
            />

            <div className="mt-4 space-y-2">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...currentQuestion.options];
                      newOptions[index] = e.target.value;
                      setCurrentQuestion({ ...currentQuestion, options: newOptions });
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={currentQuestion.correctAnswer === option}
                    onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: option })}
                  />
                </div>
              ))}
            </div>

            <button
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all font-medium"
              onClick={handleAddQuestion}
            >
              + Add Question
            </button>
          </div>
        </div>

        {/* Display Added Questions */}
        {questions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-orange-700">Questions Added:</h3>
            <ul className="mt-2 space-y-3">
              {questions.map((q, idx) => (
                <li key={idx} className="bg-white shadow p-4 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium">{idx + 1}. {q.questionText}</p>
                  <ul className="mt-1 ml-4 space-y-1">
                    {q.options.map((opt, i) => (
                      <li key={i} className={`${opt === q.correctAnswer ? "text-green-600 font-semibold" : "text-gray-700"}`}>
                        {opt}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Finish Button */}
        <button
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all font-medium"
          onClick={handleCreateQuiz}
        >
          Finish & Create Quiz
        </button>
      </div>
    </div>
  );
}
