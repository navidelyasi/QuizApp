import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../hooks/initFirebase.jsx";
import { FaCheck } from "react-icons/fa";
import "../styles/index.css";

export default function Menu() {
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  if (!username) navigate("/");

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    try {
      const userDoc = doc(db, "quiz-answers", username);
      const userDocSnap = await getDoc(userDoc);
      setStatus(userDocSnap.data());
      console.log("STATUS : _______ ", userDocSnap.data());
    } catch (error) {
      console.log("ERROR : ", error);
    }
  };

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
      {/* _______________________ Kids  _______________________ */}
      <div className="quiz-buttons">
        <div className="general-text">Kids:</div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <>
            <button
              className="general-button2"
              key={"practice_" + id}
              onClick={() => handleQuizClick(id, "practice_kids")}
            >
              Practice Unit {id}
            </button>
            <button
              className={`general-button ${
                status && status[`kids_${id}`] && "done"
              }`}
              key={"quiz_" + id}
              onClick={() => handleQuizClick(id, "quiz_kids")}
            >
              Quiz Unit {id}
              {status && status[`kids_${id}`] && (
                <FaCheck style={{ marginLeft: "8px", color: "green" }} />
              )}
            </button>
          </>
        ))}
      </div>
      {/* _______________________ Adults  _______________________ */}
      <div className="quiz-buttons">
        <div className="general-text">Adults:</div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <>
            <button
              className="general-button2"
              key={"practice_" + id}
              onClick={() => handleQuizClick(id, "practice_adults")}
            >
              Practice Unit {id}
            </button>
            <button
              className={`general-button ${
                status && status[`adults_${id}`] && "done"
              }`}
              key={"quiz_" + id}
              onClick={() => handleQuizClick(id, "quiz_adults")}
            >
              Quiz Unit {id}
              {status && status[`adults_${id}`] && (
                <FaCheck style={{ marginLeft: "8px", color: "green" }} />
              )}
            </button>
          </>
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
