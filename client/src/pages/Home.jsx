import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Quiz App!</h1>
        <p className="text-gray-600 text-lg mb-6">
          Test your knowledge with fun and challenging questions. You have 15 seconds for each question. Good luck!
        </p>
        <Link to="/quiz">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition">
            Start Quiz
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
