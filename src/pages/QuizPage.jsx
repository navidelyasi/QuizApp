import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizData } from "../data/quizData.js";
import Flashcards from "../components/Flashcards.jsx";
import FillInputDrag from "../components/FillInputDrag.jsx";
import DragPairs from "../components/DragPairs.jsx";
import MultiChoice from "../components/MultiChoice.jsx";
import Topic from "../components/Topic.jsx";
import TopicDrag from "../components/TopicDrag.jsx";
import SentenceMaking from "../components/SentenceMaking.jsx";
import Timer from "../components/subComponents/Timer.jsx";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../hooks/initFirebase.jsx";
import {
  playlevelpassed,
  playnotification2,
} from "../hooks/handleSoundEffects.jsx";
import "../styles/index.css";
import "../styles/quiz-page.css";
import { FaPaperPlane, FaStepBackward, FaStepForward } from "react-icons/fa";
import { ImExit } from "react-icons/im";

export default function QuizPage() {
  const navigate = useNavigate();
  const { quizId } = useParams(); // quizId is like adults_3
  const username = localStorage.getItem("username");
  if (!username) navigate("/login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [questionId, setQuestionId] = useState(0);
  const quiz = quizData["quiz_" + quizId]; // quiz is an array of questions

  // if quiz is not available, show a message
  if (!quiz)
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

  // _______________________ timer ______________________________
  // _______________________ timer set-up _______________________
  // initial time is 30 min (for adults) or 60 min (for kids)
  // Get initial total time based on quiz type (kids or adults)
  const initialTotalTime = quizId[0] === "k" ? 60 * 60 : 30 * 60;
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const timeLeft = Math.max(initialTotalTime - totalTimeSpent, 0);
  const percentage =
    ((initialTotalTime - totalTimeSpent) / initialTotalTime) * 100;

  // Timer effect
  useEffect(() => {
    playnotification2();
    const intervalId = setInterval(() => {
      setTotalTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const addMinutes = (minutes) => {
    setTotalTimeSpent((prev) => prev - minutes * 60);
  };

  // _____________ format time _____________
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Function to generate initial state
  const generateInitialAnswers = () => {
    const initialAnswers = {};
    quiz.forEach((question) => {
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
    // it is something like:_________ quiz_adults_3_answers_navid
    const localAnswers = localStorage.getItem(
      `quiz_${quizId}_answers_${username}`
    );
    return localAnswers ? JSON.parse(localAnswers) : generateInitialAnswers();
  });

  // by changing each sub question's answer,
  // keeps the changes here, in state on parent component
  const handleAnswerChange = useCallback(
    (subQuestionId, value) => {
      if (quiz[questionId].type === "sentence-making") {
        setAnswers((prev) => ({
          ...prev,
          [quiz[questionId].id]: value,
        }));
      } else {
        setAnswers((prev) => ({
          ...prev,
          [quiz[questionId].id]: {
            ...prev[quiz[questionId].id],
            [subQuestionId]: value,
          },
        }));
      }
    },
    [quiz, questionId]
  );

  // saves all answer-data for ALL question
  // submits data to an external server (Firebase)
  const handleSubmitAll = async () => {
    setIsSubmitting(true);

    try {
      const userDoc = doc(db, "quiz-answers", username);
      const userDocSnap = await getDoc(userDoc);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const existingSubmissions = userData[quizId] || [];

        // Create new submission object
        const newSubmission = {
          answers,
          timeSpent: formatTime(totalTimeSpent),
          date: new Date().toLocaleDateString(),
        };

        // Add new submission to beginning of array
        const updatedSubmissions = [newSubmission, ...existingSubmissions];

        // Update document with new array of submissions
        await updateDoc(userDoc, {
          [quizId]: updatedSubmissions,
        });
      } else {
        // If document doesn't exist, create it with first submission
        await setDoc(userDoc, {
          [quizId]: [
            {
              answers,
              timeSpent: formatTime(totalTimeSpent),
              date: new Date().toLocaleDateString(),
            },
          ],
        });
      }
      console.log("DONE");
      const completedQuizzes =
        JSON.parse(localStorage.getItem(`${username}_quizzes_completed`)) || [];
      if (!completedQuizzes.includes(quizId)) {
        localStorage.setItem(
          `${username}_quizzes_completed`,
          JSON.stringify([...completedQuizzes, quizId])
        );
      }

      localStorage.removeItem(`quiz_${quizId}_answers_${username}`);
    } catch (error) {
      console.log("ERROR : ", error);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      playlevelpassed();
      navigate("/menu");
    }, 300);
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
    }, 300);
  };

  const handleSubmitOneQuestion = useCallback(
    (action) => {
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
    },
    [quiz, questionId]
  );

  // renders the question component based on the question type
  const renderQuestionComponent = useCallback(() => {
    switch (quiz[questionId].type) {
      case "flashcards":
        return <Flashcards quizId={quizId} questionData={quiz[questionId]} />;
      case "fill_input":
        return (
          <FillInputDrag
            questionData={quiz[questionId]}
            answers={answers[quiz[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
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
      case "topic-drag":
        return (
          <TopicDrag
            quizId={quizId}
            questionData={quiz[questionId]}
            answers={answers[quiz[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      case "sentence-making":
        return (
          <SentenceMaking
            questionData={quiz[questionId]}
            answers={answers[quiz[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      default:
        return <div>Unknown question type: {quiz[questionId].type}</div>;
    }
  }, [
    questionId,
    quiz,
    answers,
    handleAnswerChange,
    handleSubmitOneQuestion,
    quizId,
  ]);

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
          <div className="sidebar-questions button-group">
            <button
              className="general-button left-button"
              onClick={() =>
                setQuestionId(questionId > 0 ? questionId - 1 : questionId)
              }
            >
              <div className="button-content">
                <FaStepBackward
                  style={{
                    marginRight: "10px",
                  }}
                />
                previous question
              </div>
            </button>
            <button
              className="general-button right-button"
              onClick={() =>
                setQuestionId(
                  questionId < quiz.length - 1 ? questionId + 1 : questionId
                )
              }
            >
              <div className="button-content">
                next question
                <FaStepForward style={{ marginLeft: "10px" }} />
              </div>
            </button>
          </div>
        )}
        {/* submit and exit */}
        <div className="sidebar-questions">
          <button className="submit-button" onClick={handleSubmitAll}>
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <div className="button-content">
                <FaPaperPlane style={{ marginRight: "5px" }} />
                Submit All Answers
              </div>
            )}
          </button>
          <button className="exit-button" onClick={handleQuit}>
            <div className="button-content">
              Exit
              <ImExit style={{ marginLeft: "10px" }} />
            </div>
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

      {/* _______________________ timer _______________________ */}
      <Timer
        percentage={percentage}
        timeLeft={timeLeft}
        totalTimeSpent={totalTimeSpent}
        formatTime={formatTime}
      />

      {/* _______________________ time is up _______________________ */}
      {timeLeft <= 0 && (
        <div className="submitting-overlay">
          <div className="submitting-content">
            <h1>Time is up</h1>
            <button className="general-button" onClick={handleSubmitAll}>
              <FaPaperPlane style={{ marginRight: "5px" }} />
              Submit All Answers
            </button>
            <h1>Do you need more time?</h1>
            <button className="general-button" onClick={() => addMinutes(10)}>
              Add 10 minutes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
