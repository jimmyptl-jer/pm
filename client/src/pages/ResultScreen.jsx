import { useContext } from "react";
import { QuizContext } from "../Context/QuizContext";
import { useNavigate } from "react-router-dom";

const ResultScreen = () => {
  const { score, questions, setCurrentQuestion, setScore } = useContext(QuizContext);
  const navigate = useNavigate();

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    navigate("/quiz"); // Restart quiz
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 text-center">
      <h2 className="text-2xl font-bold text-gray-800">Quiz Completed!</h2>

      <p className="text-lg mt-4 font-semibold">
        Your Score: <span className="text-green-500">{score}</span> / {questions.length}
      </p>

      <p className="mt-2 text-gray-600">
        Correct Answers: <span className="text-green-600">{score}</span> <br />
        Incorrect Answers: <span className="text-red-600">{questions.length - score}</span>
      </p>

      <button
        onClick={handleRestart}
        className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition"
      >
        Retake Quiz
      </button>

      <button
        onClick={() => navigate("/")}
        className="mt-3 px-6 py-3 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-600 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ResultScreen;
