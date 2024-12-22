import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizData } from "../data/quizData.js";
import Flashcards from "../components/Flashcards.jsx";
import FillInput from "../components/FillInput.jsx";
import DragPairs from "../components/DragPairs.jsx";
import MultiChoice from "../components/MultiChoice.jsx";
import Topic from "../components/Topic.jsx";
import "../styles/index.css";
import "../styles/quiz-page.css";
import {
  playlevelpassed,
  playnotification2,
} from "../hooks/handle-sound-effects.js";

export default function QuizPage() {
  const navigate = useNavigate();
  const { quizId } = useParams(); // quizId is like adults_3
  const username = localStorage.getItem("username");
  if (!username) navigate("/");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [questionId, setQuestionId] = useState(0);
  const quiz = quizData["quiz_" + quizId]; // quiz is an array of questions

  // if quiz is not available, show a message
  if (!quiz)
    return (
      <div className="login-container">
        <h1 className="login-title">Quiz is not available yet</h1>
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
    quiz.forEach((question) => {
      initialAnswers[question.id] = {};
      question.data.forEach((_, subQuestionIndex) => {
        initialAnswers[question.id][subQuestionIndex] = "";
      });
      if (question.retry)
        initialAnswers[question.id][question.data.length] = "";
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

  // saves all answer-data for ALL question
  // submits data to an external server (Firebase)
  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    localStorage.setItem(
      `quiz_${quizId}_answers_${username}`,
      JSON.stringify(answers)
    );

    // try {
    //     const newID = new Date().toISOString()
    //     const userDoc = doc(db, "users", newID);
    //     await setDoc(userDoc, {userName, answers });
    //     console.log("DONE")
    // } catch (error){
    //     console.log("ERROR : ", error);
    // }

    setTimeout(() => {
      setIsSubmitting(false);
      playlevelpassed();
      navigate("/menu");
    }, 1000);
  };

  // save answers in localStorage and navigates to menu
  const handleQuit = () => {
    setIsSubmitting(true);

    localStorage.setItem(
      `quiz_${quizId}_answers_${username}`,
      JSON.stringify(answers)
    );

    setTimeout(() => {
      setIsSubmitting(false);
      playlevelpassed();
      navigate("/menu");
    }, 1000);
  };

  const handleSubmitOneQuestion = (action) => {
    if (action === "submit") {
      setAnswers((prev) => ({
        ...prev,
        [quiz[questionId].id]: {
          ...prev[quiz[questionId].id],
          [quiz[questionId].data.length]: "submitted",
        },
      }));
    } else if (action === "retry") {
      setAnswers((prev) => ({
        ...prev,
        [quiz[questionId].id]: {
          ...prev[quiz[questionId].id],
          [quiz[questionId].data.length]: "",
        },
      }));
    } else if (action === "show-answers") {
      setAnswers((prev) => ({
        ...prev,
        [quiz[questionId].id]: {
          ...prev[quiz[questionId].id],
          [quiz[questionId].data.length]: "show-answers",
        },
      }));
    }
  };

  // renders the question component based on the question type
  const renderQuestionComponent = () => {
    switch (quiz[questionId].type) {
      case "flashcards":
        return (
          <Flashcards
            quizId={quizId}
            questionData={quiz[questionId]}
            answers={answers[quiz[questionId].id]}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "fill_input":
        return (
          <FillInput
            quizId={quizId}
            questionData={quiz[questionId]}
            answers={answers[quiz[questionId].id]}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "drag_column":
        return (
          <DragPairs
            questionData={quiz[questionId]}
            answers={answers[quiz[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      case "multi_choice":
        return (
          <MultiChoice
            questionData={quiz[questionId]}
            answers={answers[quiz[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      case "topic":
        return (
          <Topic
            quizId={quizId}
            questionData={quiz[questionId]}
            answers={answers[quiz[questionId].id]}
            handleAnswerChange={handleAnswerChange}
          />
        );
      default:
        return <div>Unknown question type: {quiz[questionId].type}</div>;
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
                  questionId < quiz.length - 1 ? questionId + 1 : questionId
                )
              }
            >
              next question
            </button>
          </div>
        )}
        {/* submit and exit */}
        <div className="sidebar-questions">
          <button className="submit-button" onClick={handleSubmitAll}>
            {isSubmitting ? "Submitting..." : "Submit All Answers"}
          </button>
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
