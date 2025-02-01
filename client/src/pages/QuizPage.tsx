import React, { useState, useEffect } from "react";
import { useQuizQuestions, useSubmitAnswer } from "../api/quizApi"; // Adjust the path accordingly

const QuizPage = () => {
  const { data: quizData, isLoading, isError, error } = useQuizQuestions(); // Now quizData has the correct structure
  const { mutate: submitAnswer, isLoading: isSubmitting } = useSubmitAnswer();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (quizData && quizData.questions.length > 0) {
      setSelectedAnswer(null);
      setTimeLeft(15);
    }
  }, [currentQuestionIndex, quizData]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswerSubmit(); // Auto-submit when timer expires
    }

    const timer =
      timeLeft > 0 ? setInterval(() => setTimeLeft(timeLeft - 1), 1000) : null;
    return () => clearInterval(timer!); // Cleanup timer on component unmount
  }, [timeLeft]);

  const handleAnswerSubmit = () => {
    if (selectedAnswer) {
      const currentQuestion = quizData?.questions[currentQuestionIndex];
      if (currentQuestion) {
        submitAnswer({
          answer: selectedAnswer,
          questionId: currentQuestion._id,
        });

        if (currentQuestionIndex < quizData?.questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setTimeLeft(15);
        } else {
          setQuizCompleted(true);
        }
      }
    }
  };

  if (isLoading) {
    return <div>Loading quiz questions...</div>;
  }

  if (isError) {
    return <div>Error fetching quiz questions: {(error as Error).message}</div>;
  }

  if (!quizData || quizData.questions.length === 0) {
    return <div>No quiz questions available.</div>;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>{quizData.title}</h2>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${
              ((currentQuestionIndex + 1) / quizData.questions.length) * 100
            }%`,
          }}
        />
      </div>

      {/* Timer */}
      <div className="timer">
        <p>{timeLeft}s left</p>
      </div>

      {/* Question and Options */}
      <div className="question">
        <p>{currentQuestion.question}</p>
      </div>

      <div className="options">
        {currentQuestion.options.map((option) => (
          <button
            key={option._id}
            onClick={() => setSelectedAnswer(option.option)}
            disabled={isSubmitting}
            className={selectedAnswer === option.option ? "selected" : ""}
          >
            {option.option}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <div className="submit-button">
        <button
          onClick={handleAnswerSubmit}
          disabled={isSubmitting || !selectedAnswer}
        >
          {currentQuestionIndex < quizData.questions.length - 1
            ? "Next"
            : "Finish"}
        </button>
      </div>

      {isSubmitting && <p>Submitting your answer...</p>}

      {/* Show Quiz Completion */}
      {quizCompleted && (
        <div>
          <h3>Quiz Completed!</h3>
          <p>Your final score will be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
