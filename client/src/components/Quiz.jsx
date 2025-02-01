import { useContext } from "react";
import { QuizContext } from "../../Context/QuizContext";
import Timer from "./Timer";

const Quiz = () => {
  const { questions, currentQuestion, setCurrentQuestion, selectedAnswer, setSelectedAnswer, setScore } = useContext(QuizContext);

  if (!questions.length) return <div className="text-center mt-10">Loading...</div>;

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore(prev => prev + 1);
    }
    setSelectedAnswer(null);
    setCurrentQuestion(prev => prev + 1);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {questions[currentQuestion].question}
      </h2>
      <Timer onTimeout={handleNext} />
      <div className="mt-4">
        {questions[currentQuestion].incorrect_answers.concat(questions[currentQuestion].correct_answer)
          .sort().map((option, index) => (
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
      <button
        disabled={!selectedAnswer}
        onClick={handleNext}
        className="w-full mt-4 p-3 bg-green-500 text-white font-semibold rounded-md disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;
