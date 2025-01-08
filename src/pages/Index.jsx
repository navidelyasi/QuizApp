import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages-styles/index-page.css";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="index-container">
      <div className="index-title">Navid Elyasi</div>
      <div className="index-content">
        <button
          className="index-button"
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/pictures/general/cv.png";
            link.download = "Navid_Elyasi_CV.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          My CV
          <img
            src="/pictures/general/cv.png"
            alt="cv"
            className="index-picture"
          />
        </button>
        <button className="index-button" onClick={() => navigate("/login")}>
          See the Quiz App
          <img
            src="/pictures/general/quiz.png"
            alt="quiz icon"
            className="index-picture"
          />
        </button>
      </div>
    </div>
  );
}
