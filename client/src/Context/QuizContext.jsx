import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:7000/api/questions")
      .then(response => setQuestions(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <QuizContext.Provider value={{
      questions, currentQuestion, setCurrentQuestion,
      score, setScore, selectedAnswer, setSelectedAnswer
    }}>
      {children}
    </QuizContext.Provider>
  );
};
