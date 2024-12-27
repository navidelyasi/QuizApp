import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

export default function Menu() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  if (!username) navigate("/");

  function handleQuizClick(id, type) {
    if (type === "quiz_kids") {
      navigate(`/quiz/kids_${id}`);
    } else if (type === "quiz_adults") {
      navigate(`/quiz/adults_${id}`);
    } else if (type === "practice_kids") {
      navigate(`/practice/kids_${id}`);
    } else if (type === "practice_adults") {
      navigate(`/practice/adults_${id}`);
    }
  }

  return (
    <div className="main-menu-container">
      <div className="general-text">Welcome, {username}!</div>
      {/* _______________________ Kids Practices _______________________ */}
      <div className="quiz-buttons">
        <div className="general-text">Kids Practices:</div>
        {[1, 2, 3, 4, 5].map((practiceId) => (
          <button
            className="general-button2"
            key={"practice_" + practiceId}
            onClick={() => handleQuizClick(practiceId, "practice_kids")}
          >
            Practice Unit {practiceId}
          </button>
        ))}
      </div>
      {/* _______________________ Kids Quizzes _______________________ */}
      <div className="quiz-buttons">
        <div className="general-text">Kids Quizzes:</div>
        {[1, 2, 3, 4, 5].map((quizId) => (
          <button
            className="general-button"
            key={"quiz_" + quizId}
            onClick={() => handleQuizClick(quizId, "quiz_kids")}
          >
            Quiz Unit {quizId}
          </button>
        ))}
      </div>
      {/* _______________________ Adults Practices _______________________ */}
      <div className="quiz-buttons">
        <div className="general-text">Adults Practices:</div>
        {[1, 2, 3, 4, 5].map((practiceId) => (
          <button
            className="general-button2"
            key={"practice_" + practiceId}
            onClick={() => handleQuizClick(practiceId, "practice_adults")}
          >
            Practice Unit {practiceId}
          </button>
        ))}
      </div>
      {/* _______________________ Adults Quizzes _______________________ */}
      <div className="quiz-buttons">
        <div className="general-text">Adults Quizzes:</div>
        {[1, 2, 3, 4, 5].map((quizId) => (
          <button
            className="general-button"
            key={"quiz_" + quizId}
            onClick={() => handleQuizClick(quizId, "quiz_adults")}
          >
            Quiz Unit {quizId}
          </button>
        ))}
      </div>
      {/* _______________________ Footer _______________________ */}
      <div className="general-text">Thanks for visiting us</div>
      <button
        className="general-button"
        onClick={() => {
          localStorage.removeItem("username");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
