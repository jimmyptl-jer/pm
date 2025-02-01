import { useContext } from "react";
import { QuizContext } from "../../Context/QuizContext";

const Results = () => {
  const { score, questions } = useContext(QuizContext);
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800">Quiz Completed!</h2>
      <p className="text-center mt-4 text-lg font-semibold">
        Your Score: <span className="text-green-500">{score}</span> / {questions.length}
      </p>
    </div>
  );
};

export default Results;
