import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../hooks/initFirebase.jsx";
import { useAuth } from "../hooks/AuthContext.jsx";
import { useQuiz } from "../hooks/QuizContext.jsx";
import { FaCheck, FaUser, FaSignOutAlt, FaStar } from "react-icons/fa";
import "../styles/pages-styles/menu-page.css";

export default function Menu() {
  const { currentUser, logout } = useAuth();
  const { completedQuizzes } = useQuiz();

  const username = currentUser.email;
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (completedQuizzes.length === 0) {
      getQuizzesStatus();
    } else {
      setStatus(completedQuizzes);
    }
  }, [completedQuizzes]);

  const getQuizzesStatus = async () => {
    try {
      const userDoc = doc(db, "quiz-answers", username);
      const userDocSnap = await getDoc(userDoc);
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        const __status = Object.keys(data);
        setStatus(__status);
      } else {
        setStatus([]);
      }
    } catch (error) {
      setStatus([]);
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

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("ERROR in logout (from menu page) : ", error);
    }
  }

  return (
    <div className="main-menu-container">
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
        <div className="title-text">Kids:</div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <div key={"kids_" + id} className="unit-card">
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
                  status && status.includes(`quiz_kids_${id}`) && "done"
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
        <div className="title-text">Adults:</div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <div key={"adults_" + id} className="unit-card">
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
                  status && status.includes(`quiz_adults_${id}`) && "done"
                }`}
                key={"quiz_" + id}
                onClick={() => handleQuizClick(id, "quiz_adults")}
              >
                <div className="menu-button-content">
                  Quiz
                  {status && status.includes(`quiz_adults_${id}`) && (
                    <FaCheck style={{ color: "var(--color-dark)" }} />
                  )}
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* _______________________ logout _______________________ */}
      <div className="general-text">Thanks for visiting us</div>
      <button className="logout-button" onClick={handleLogout}>
        <div className="menu-button-content">
          <FaSignOutAlt style={{ marginRight: "5px" }} />
          Logout
        </div>
      </button>
      {/* _______________________ Loading  _______________________ */}
      {status === null && (
        <div className="overlay-content">
          <div className="general-text">Loading ...</div>
        </div>
      )}
    </div>
  );
}
