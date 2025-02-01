import { useQuery, useMutation } from "react-query";

// Define the base URL of the API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define the QuizQuestion interface
export interface QuizQuestion {
  _id: string;
  question: string;
  options: {
    _id: string;
    option: string;
  }[];
  correctAnswer: string;
}

// Define the QuizData interface that contains the quiz title and the list of quiz questions
export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

// Function to fetch quiz questions from the API
const fetchQuizQuestions = async (): Promise<QuizData> => {
  const response = await fetch(`${API_BASE_URL}/api/quiz`);
  if (!response.ok) {
    throw new Error("Failed to fetch quiz questions");
  }
  return response.json();
};

// Function to submit the answer for a quiz question
const submitAnswer = async (variables: {
  answer: string;
  questionId: string;
}) => {
  const { answer, questionId } = variables;

  const response = await fetch(`${API_BASE_URL}/api/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer, questionId }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit answer");
  }

  return response.json();
};

// Custom hook to fetch quiz questions
export const useQuizQuestions = () => {
  return useQuery<QuizData>("quizQuestions", fetchQuizQuestions);
};

// Custom hook to submit the answer for a quiz question
export const useSubmitAnswer = () => {
  return useMutation(submitAnswer);
};
