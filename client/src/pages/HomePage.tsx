// src/pages/HomePage.tsx
import React from "react";
import QuizPage from "./QuizPage";

const HomePage: React.FC = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome to the Quiz App
      </h1>

      <div className="mb-8">
        <p className="text-xl text-gray-700 text-center">
          Select a quiz to start
        </p>
      </div>
      <QuizPage />
    </div>
  );
};

export default HomePage;
