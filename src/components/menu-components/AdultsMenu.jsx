import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages-styles/menu-page.css";
import { FaCheck } from "react-icons/fa";

function AdultsMenu({ status }) {
  const navigate = useNavigate();

  function handleQuizClick(id, type) {
    if (type === "quiz_adults") {
      navigate(`/quiz/quiz_adults_${id}`);
    } else if (type === "practice_adults") {
      navigate(`/quiz/practice_adults_${id}`);
    }
  }

  return (
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
  );
}

export default AdultsMenu;
