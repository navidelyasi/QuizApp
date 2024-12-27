import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizData } from "../data/quizData.js";
import Flashcards from "../components/Flashcards.jsx";
import FillInputDrag from "../components/FillInputDrag.jsx";
import DragPairs from "../components/DragPairs.jsx";
import MultiChoice from "../components/MultiChoice.jsx";
import Topic from "../components/Topic.jsx";
import TopicDrag from "../components/TopicDrag.jsx";
import SentenceMaking from "../components/SentenceMaking.jsx";
import {
  playlevelpassed,
  playnotification2,
} from "../hooks/handleSoundEffects.jsx";
import "../styles/index.css";
import "../styles/quiz-page.css";

export default function PracticePage() {
  const navigate = useNavigate();
  const { practiceId } = useParams(); // practiceId is like adults_3 or practice_adults_3
  const username = localStorage.getItem("username");
  if (!username) navigate("/");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [questionId, setQuestionId] = useState(0);
  const practice = quizData["practice_" + practiceId]; // practice is an array of questions

  // if practice is not available, show a message
  if (!practice)
    return (
      <div className="login-container">
        <h1 className="login-title">It is not available yet</h1>
        <h1 className="login-title">Comming soon</h1>
        <button
          className="general-button"
          onClick={() => {
            playnotification2();
            navigate("/menu");
          }}
        >
          Back to menu
        </button>
      </div>
    );

  // Function to generate initial state
  const generateInitialAnswers = () => {
    const initialAnswers = {};
    practice.forEach((question) => {
      initialAnswers[question.id] = {};
      if (question.type === "sentence-making") {
        question.data.forEach((subQuestion, subQuestionIndex) => {
          initialAnswers[question.id][subQuestionIndex] = Array(
            subQuestion.correct.length
          ).fill("");
        });
      } else {
        question.data.forEach((_, subQuestionIndex) => {
          initialAnswers[question.id][subQuestionIndex] = "";
        });
      }

      if (question.retry)
        initialAnswers[question.id][question.data.length] = "";
    });
    return initialAnswers;
  };
  const [answers, setAnswers] = useState(() => {
    // load answers data from local storage if it is available
    // it is something like:_________ practice_adults_3_answers_navid
    const localAnswers = localStorage.getItem(
      `practice_${practiceId}_answers_${username}`
    );
    // if local storage has data, then we don't generate initial answers
    return localAnswers ? JSON.parse(localAnswers) : generateInitialAnswers();
  });

  // by changing each sub question's answer,
  // keeps the changes here, in state on parent component
  const handleAnswerChange = (subQuestionId, value) => {
    if (practice[questionId].type === "sentence-making") {
      setAnswers((prev) => ({
        ...prev,
        [practice[questionId].id]: value,
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [practice[questionId].id]: {
          ...prev[practice[questionId].id],
          [subQuestionId]: value,
        },
      }));
    }
  };

  // save answers in localStorage and navigates to menu
  const handleQuit = () => {
    setIsSubmitting(true);

    localStorage.setItem(
      `practice_${practiceId}_answers_${username}`,
      JSON.stringify(answers)
    );

    setTimeout(() => {
      setIsSubmitting(false);
      playlevelpassed();
      navigate("/menu");
    }, 300);
  };

  const handleSubmitOneQuestion = (action) => {
    if (action === "submit") {
      setAnswers((prev) => ({
        ...prev,
        [practice[questionId].id]: {
          ...prev[practice[questionId].id],
          [practice[questionId].data.length]: "submitted",
        },
      }));
    } else if (action === "retry") {
      setAnswers((prev) => ({
        ...prev,
        [practice[questionId].id]: {
          ...prev[practice[questionId].id],
          [practice[questionId].data.length]: "",
        },
      }));
    } else if (action === "show-answers") {
      setAnswers((prev) => ({
        ...prev,
        [practice[questionId].id]: {
          ...prev[practice[questionId].id],
          [practice[questionId].data.length]: "show-answers",
        },
      }));
    }
  };

  // renders the question component based on the question type
  const renderQuestionComponent = () => {
    switch (practice[questionId].type) {
      case "flashcards":
        return (
          <Flashcards quizId={practiceId} questionData={practice[questionId]} />
        );
      case "fill_input":
        return (
          <FillInputDrag
            questionData={practice[questionId]}
            answers={answers[practice[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      case "drag_column":
        return (
          <DragPairs
            questionData={practice[questionId]}
            answers={answers[practice[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      case "multi_choice":
        return (
          <MultiChoice
            questionData={practice[questionId]}
            answers={answers[practice[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      case "topic":
        return (
          <Topic
            quizId={practiceId}
            questionData={practice[questionId]}
            answers={answers[practice[questionId].id]}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "topic-drag":
        return (
          <TopicDrag
            quizId={practiceId}
            questionData={practice[questionId]}
            answers={answers[practice[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      case "sentence-making":
        return (
          <SentenceMaking
            questionData={practice[questionId]}
            answers={answers[practice[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      default:
        return <div>Unknown question type: {practice[questionId].type}</div>;
    }
  };

  // plays notification sound when the page loads
  useEffect(() => {
    playnotification2();
  }, []);

  // scrolls to the top of the page when the question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [questionId]);

  return (
    <div className={`quiz-container ${isSubmitting ? "submitting" : ""}`}>
      {/* _______________________ sidebar _______________________ */}
      <div className="sidebar">
        {/* questions */}
        <div className="sidebar-questions">
          {practice.map((q, i) => (
            <button
              key={i}
              className={`general-button ${questionId === i ? "active" : ""}`}
              onClick={() => setQuestionId(i)}
            >
              Question {i + 1}
            </button>
          ))}
        </div>
        {/* previous and next question */}
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
                  questionId < practice.length - 1 ? questionId + 1 : questionId
                )
              }
            >
              next question
            </button>
          </div>
        )}
        {/* submit and exit */}
        <div className="sidebar-questions">
          <button className="exit-button" onClick={handleQuit}>
            Exit
          </button>
        </div>
      </div>
      {/* _______________________ main content _______________________ */}
      <div className="main-content">{renderQuestionComponent()}</div>

      {/* _______________________ submitting overlay _______________________ */}
      {isSubmitting && (
        <div className="submitting-overlay">
          <div className="submitting-content">
            <div className="spinner"></div>
            <div className="general-text">Submitting your answers...</div>
          </div>
        </div>
      )}
    </div>
  );
}
