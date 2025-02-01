import { useContext } from "react";
import { QuizContext } from '../Context/QuizContext';
import Timer from "../components/Timer";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";

const QuizScreen = () => {
  const { questions, currentQuestion, setCurrentQuestion, selectedAnswer, setSelectedAnswer, setScore } = useContext(QuizContext);
  const navigate = useNavigate();

  if (!questions.length) return <div className="text-center mt-10">Loading...</div>;

  const handleNext = () => {
    // Check if the answer is correct
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    // Reset the selected answer for the next question
    setSelectedAnswer(null);

    // Move to the next question or navigate to results if last question
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      navigate("/results"); // Redirect to results screen after last question
    }
  };

  const currentQ = questions[currentQuestion]; // Current question data

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <ProgressBar current={currentQuestion} total={questions.length} />
      <h2 className="text-xl font-semibold text-gray-800 mt-4">{currentQ.question}</h2>
      <Timer onTimeout={handleNext} />

      <div className="mt-4">
        {/* Combine the options, including the correct answer and shuffle */}
        {currentQ.options
          .sort(() => Math.random() - 0.5) // Shuffle the options
          .map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              className={`w-full p-3 my-2 text-left rounded-md ${selectedAnswer === option ? "bg-blue-500 text-white" : "bg-gray-100"
                } hover:bg-blue-400`}
            >
              {option}
            </button>
          ))}
      </div>

      <div className="flex justify-between mt-4">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50"
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        {/* Next or Finish Button */}
        <button
          disabled={!selectedAnswer} // Disable button until an option is selected
          onClick={handleNext}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg disabled:bg-gray-300"
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;
