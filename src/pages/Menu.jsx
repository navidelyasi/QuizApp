import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../hooks/initFirebase.jsx";
import { FaCheck, FaUser, FaSignOutAlt, FaStar } from "react-icons/fa";
import "../styles/menu-page.css";

export default function Menu() {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  if (!username) navigate("/login");

  useEffect(() => {
    const completedQuizzes =
      JSON.parse(localStorage.getItem(`${username}_quizzes_completed`)) || [];
    if (completedQuizzes.length === 0) {
      // getQuizzesStatus();
      setStatus(completedQuizzes);
    } else {
      setStatus(completedQuizzes);
    }
  }, []);

  const getQuizzesStatus = async () => {
    try {
      const userDoc = doc(db, "quiz-answers", username);
      const userDocSnap = await getDoc(userDoc);
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        const __status = Object.keys(data);
        setStatus(__status);
        localStorage.setItem(
          `${username}_quizzes_completed`,
          JSON.stringify(__status)
        );
      } else {
        setStatus([]);
      }
    } catch (error) {
      console.log("ERROR in firebase connection (from menu page) : ", error);
    }
  };

  function handleQuizClick(id, type) {
    if (type === "quiz_kids") {
      navigate(`/quiz/quiz_kids_${id}`);
    } else if (type === "quiz_adults") {
      navigate(`/quiz/quiz_adults_${id}`);
    } else if (type === "practice_kids") {
      navigate(`/quiz/practice_kids_${id}`);
    } else if (type === "practice_adults") {
      navigate(`/quiz/practice_adults_${id}`);
    }
  }

  return (
    <div className="main-menu-container">
      {status === null && (
        <div className="overlay-content">
          <div className="general-text">Loading ...</div>
        </div>
      )}
      <div className="general-text">
        Welcome, {username}!
        <FaUser style={{ marginRight: "5px" }} />
        {status &&
          status.map((_, index) => (
            <FaStar key={index} style={{ marginRight: "5px", color: "gold" }} />
          ))}
      </div>
      {/* _______________________ Kids  _______________________ */}
      <div className="quiz-buttons">
        <div className="general-text">Kids:</div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <div className="unit-card">
            unit {id}
            <div className="menu-button-group">
              <button
                className="menu-button practice-button top-button"
                key={"practice_" + id}
                onClick={() => handleQuizClick(id, "practice_kids")}
              >
                Practice
              </button>
              <button
                className={`menu-button bottom-button ${
                  status && status.includes(`kids_${id}`) && "done"
                }`}
                key={"quiz_" + id}
                onClick={() => handleQuizClick(id, "quiz_kids")}
              >
                <div className="menu-button-content">
                  Quiz
                  {status && status.includes(`kids_${id}`) && <FaCheck />}
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* _______________________ Adults  _______________________ */}
      <div className="quiz-buttons">
        <div className="general-text">Adults:</div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <div className="unit-card">
            unit {id}
            <div className="menu-button-group">
              <button
                className="menu-button practice-button top-button"
                key={"practice_" + id}
                onClick={() => handleQuizClick(id, "practice_adults")}
              >
                Practice
              </button>
              <button
                className={`menu-button bottom-button ${
                  status && status.includes(`adults_${id}`) && "done"
                }`}
                key={"quiz_" + id}
                onClick={() => handleQuizClick(id, "quiz_adults")}
              >
                <div className="menu-button-content">
                  Quiz
                  {status && status.includes(`adults_${id}`) && <FaCheck />}
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* _______________________ logout _______________________ */}
      <div className="general-text">Thanks for visiting us</div>
      <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("username");
          navigate("/login");
        }}
      >
        <div className="menu-button-content">
          <FaSignOutAlt style={{ marginRight: "5px" }} />
          Logout
        </div>
      </button>
    </div>
  );
}
