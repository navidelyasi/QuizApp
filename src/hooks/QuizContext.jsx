import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export function useQuiz() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }) {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const saveQuizAnswers = (quizId, username, answers) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [`${quizId}_${username}`]: answers,
    }));
  };
  const getQuizAnswers = (quizId, username) => {
    return quizAnswers[`${quizId}_${username}`] || null;
  };
  const markQuizCompleted = (quizId) => {
    if (!completedQuizzes.includes(quizId)) {
      setCompletedQuizzes((prev) => [...prev, quizId]);
    }
  };
  const value = {
    quizAnswers,
    completedQuizzes,
    saveQuizAnswers,
    getQuizAnswers,
    markQuizCompleted,
  };
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
