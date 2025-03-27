import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditQuiz() {
  const { quizId } = useParams();
  console.log("Quiz ID:", quizId);

  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questions, setQuestions] = useState([]); // Ensure questions is always an array
  const [answers, setAnswers] = useState({});

  const BASE_API_URL="http://QuizByte-env.eba-bdauijyh.ap-south-1.elasticbeanstalk.com";




  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/quizzes/${quizId}`);
        const quizData = response.data;
  
        console.log("Fetched quiz data:", quizData);
  
        setQuizTitle(quizData.title);
        setQuizDescription(quizData.description);
        setQuestions(
          quizData.questions.map(q => ({
            ...q,
            options: [q.option1 || "", q.option2 || "", q.option3 || "", q.option4 || ""]
          }))
        );
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
  
    fetchQuiz();
  }, [quizId]);
  
  
  

  const handleAddQuestion = () => {
    if (
      newQuestion.questionText.trim() === "" ||
      newQuestion.correctAnswer.trim() === "" ||
      newQuestion.options.some((opt) => opt.trim() === "")
    ) {
      alert("Please fill in all fields before adding the question.");
      return;
    }

    setQuestions([...questions, { ...newQuestion, id: null }]);
    setNewQuestion({ questionText: "", options: ["", "", "", ""], correctAnswer: "" });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleUpdateQuiz = async () => {
    if (quizTitle.trim() === "" || quizDescription.trim() === "" || questions.length === 0) {
      alert("Please provide a title, description, and at least one question.");
      return;
    }
  
    console.log("Questions before submitting:", questions);
  
    try {
      const updatedQuestions = questions.map(q => {
        console.log("Processing question:", q);
  
        // Check if options exist and are an array
        if (!Array.isArray(q.options)) {
          console.error(`Error: options is not an array for question "${q.questionText}"`, q.options);
          return { ...q, options: ["", "", "", ""] }; // Provide default options to prevent error
        }
  
        return {
          id: q.id || null,
          questionText: q.questionText,
          option1: q.options[0] || "",
          option2: q.options[1] || "",
          option3: q.options[2] || "",
          option4: q.options[3] || "",
          correctAnswer: q.correctAnswer
        };
      });
  
      console.log("Updated Questions:", updatedQuestions);
  
      const response = await axios.put(`${BASE_API_URL}/api/quizzes/${quizId}`, {
        title: quizTitle,
        description: quizDescription,
        questions: updatedQuestions
      });
  
      console.log("Response from server:", response.data);
  
      if (response.status === 200) {
        alert("Quiz updated successfully!");
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      alert("Failed to update quiz.");
    }
  };
  

  const handleOptionSelect = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption, // Store the selected option
    }));
  };
  
  const handleSubmit = async () => {
    const filteredAnswers = Object.fromEntries(
      Object.entries(answers).filter(([_, value]) => value !== null)
    );
  
    console.log("Submitting answers:", filteredAnswers);
  
    try {
      const response = await axios.post(`${BASE_API_URL}/api/results/submit`, {
        username,
        quizId,
        answers: filteredAnswers, // Send only valid answers
      });
  
      if (response.status === 200) {
        alert("Quiz submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 text-center">Edit Quiz</h1>

        {/* Quiz Title */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium">Quiz Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Enter quiz title"
          />
        </div>

        {/* Quiz Description */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">Quiz Description</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            placeholder="Enter a short description..."
            rows="3"
          />
        </div>

        {/* Existing Questions List */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Existing Questions</h2>

          {questions.length > 0 ? (
            <ul className="space-y-3">
              {questions.map((q, idx) => (
                <li key={idx} className="bg-white shadow p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium">{idx + 1}. {q.questionText}</p>
                  <ul className="mt-1 ml-4 space-y-1">
                  {questions?.length > 0 ? (
  <ul>
    
  </ul>
) : (
  <p>No questions added yet.</p>
)}

                  </ul>
                  
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No questions added yet.</p>
          )}
        </div>

        {/* Add New Question Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add New Question</h2>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <label className="block text-gray-700 font-medium">Question</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={newQuestion.questionText}
              onChange={(e) => setNewQuestion({ ...newQuestion, questionText: e.target.value })}
              placeholder="Enter question..."
            />

            <div className="mt-4 space-y-2">
              {newQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...newQuestion.options];
                      newOptions[index] = e.target.value;
                      setNewQuestion({ ...newQuestion, options: newOptions });
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={newQuestion.correctAnswer === option}
                    onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: option })}
                  />
                </div>
              ))}
            </div>

            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all font-medium"
              onClick={handleAddQuestion}
            >
              + Add Question
            </button>
          </div>
        </div>

        {/* Update Quiz Button */}
        <button
          className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all font-medium"
          onClick={handleUpdateQuiz}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
