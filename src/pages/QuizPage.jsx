import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizData } from "../data/quizData.js";
import Flashcards from "../components/Flashcards.jsx";
import FillInput from "../components/FillInput.jsx";
import DragColumn from "../components/DragColumn.jsx";
import MultiChoice from "../components/MultiChoice.jsx";
import Topic from "../components/Topic.jsx";
import "../styles/index.css";
import "../styles/quiz-page.css";

export default function QuizPage() {
  const navigate = useNavigate();
  const { quizId } = useParams(); // quizId is like adults_3
  const username = localStorage.getItem("username");
  if (!username) navigate("/");

  const [questionId, setQuestionId] = useState(0);
  const quiz = quizData["quiz_" + quizId]; // quiz is an array of questions
  if (!quiz) return <div>Quiz not found</div>;

  // Function to generate initial state
  const generateInitialAnswers = () => {
    const initialAnswers = {};
    quiz.forEach((question) => {
      initialAnswers[question.id] = {};
      question.data.forEach((_, subQuestionIndex) => {
        initialAnswers[question.id][subQuestionIndex] = "";
      });
    });
    return initialAnswers;
  };
  const [answers, setAnswers] = useState(() => {
    // load answers data from local storage if it is available
    // it is something like:_________ quiz_adults_3_answers_navid
    const localAnswers = localStorage.getItem(
      `quiz_${quizId}_answers_${username}`
    );
    // if local storage has data, then we don't generate initial answers
    return localAnswers ? JSON.parse(localAnswers) : generateInitialAnswers();
  });

  // by changing each sub question's answer,
  // keeps the changes here, in state on parent component
  const handleAnswerChange = (subQuestionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [quiz[questionId].id]: {
        ...prev[quiz[questionId].id],
        [subQuestionId]: value,
      },
    }));
  };

  const renderQuestionComponent = () => {
    switch (quiz[questionId].type) {
      case "flashcards":
        return (
          <Flashcards
            quizId={quizId}
            questionData={quiz[questionId]}
            answers={answers}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "fill_input":
        return (
          <FillInput
            quizId={quizId}
            questionData={quiz[questionId]}
            answers={answers}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "drag_column":
        return (
          <DragColumn
            quizId={quizId}
            questionData={quiz[questionId]}
            answers={answers}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "multi_choice":
        return (
          <MultiChoice
            quizId={quizId}
            questionData={quiz[questionId]}
            answers={answers}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "topic":
        return (
          <Topic
            quizId={quizId}
            questionData={quiz[questionId]}
            answers={answers}
            handleAnswerChange={handleAnswerChange}
          />
        );
      default:
        return <div>Unknown question type: {quiz[questionId].type}</div>;
    }
  };

  return (
    <div className="quiz-container">
      {/* _______________________ sidebar _______________________ */}
      <div className="sidebar">
        {/* _______________________ questions _______________________ */}
        <div className="sidebar-questions">
          {quiz.map((q, i) => (
            <button
              key={i}
              className={`general-button ${questionId === i ? "active" : ""}`}
              onClick={() => setQuestionId(i)}
            >
              Question {i + 1}
            </button>
          ))}
        </div>
        {/* _______________________ previous and next question _______________________ */}
        {document.documentElement.clientWidth <= 768 && (
          <div className="sidebar-questions">
            <button
              className="general-button"
              onClick={() =>
                setQuestionId(questionId > 0 ? questionId - 1 : questionId)
              }
            >
              previous question
            </button>
            <button
              className="general-button"
              onClick={() =>
                setQuestionId(
                  questionId < selectedQuizData.length - 1
                    ? questionId + 1
                    : questionId
                )
              }
            >
              next question
            </button>
          </div>
        )}
        {/* _______________________ submit and exit _______________________ */}
        <div className="sidebar-questions">
          <button className="submit-button">Submit All Answers</button>
          <button className="exit-button" onClick={() => navigate("/")}>
            Exit
          </button>
        </div>
      </div>
      {/* _______________________ main content _______________________ */}
      <div className="main-content">{renderQuestionComponent()}</div>
    </div>
  );
}
