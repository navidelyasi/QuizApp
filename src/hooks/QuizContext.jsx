import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export function useQuiz() {
  return useContext(QuizContext);
}

export function QuizProvider({ children }) {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const saveQuizAnswers = (quizId, username, answers) => {
    console.log(
      "QuizProvider:  _ _ _ saving quiz answers : QuizId : ",
      quizId,
      " Username : ",
      username,
      " Answers : ",
      answers
    );
    setQuizAnswers((prev) => ({
      ...prev,
      [`${quizId}_${username}`]: answers,
    }));
  };
  const getQuizAnswers = (quizId, username) => {
    console.log(
      "QuizProvider:  _ _ _ getting quiz answers : QuizId : ",
      quizId,
      " Username : ",
      username
    );
    console.log("QuizProvider:  _ _ _ quizAnswers : ", quizAnswers);
    return quizAnswers[`${quizId}_${username}`] || null;
  };
  const markQuizCompleted = (quizId) => {
    console.log(
      "QuizProvider:  _ _ _ marking quiz completed : QuizId : ",
      quizId
    );
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
