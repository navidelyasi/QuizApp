import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

export default function Menu() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  if (!username) navigate("/");

  function handleQuizClick(quiz, type) {
    if (type === "kids") {
      navigate(`/quiz/kids_${quiz}`);
    } else if (type === "adults") {
      navigate(`/quiz/adults_${quiz}`);
    }
  }

  return (
    <div className="main-menu-container">
      <div className="general-text">Welcome, {username}!</div>
      {/* _______________________ Kids Quizzes _______________________ */}
      <div className="quiz-buttons">
        <div className="general-text">Kids:</div>
        {[1, 2, 3, 4, 5].map((quiz) => (
          <button
            className="general-button"
            key={quiz}
            onClick={() => handleQuizClick(quiz, "kids")}
          >
            Kids Quiz {quiz}
          </button>
        ))}
      </div>
      {/* _______________________ Adults Quizzes _______________________ */}
      <div className="quiz-buttons">
        <div className="general-text">Adults:</div>
        {[1, 2, 3, 4, 5].map((quiz) => (
          <button
            className="general-button"
            key={quiz}
            onClick={() => handleQuizClick(quiz, "adults")}
          >
            Adults Quiz {quiz}
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
