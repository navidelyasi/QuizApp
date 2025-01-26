import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages-styles/index-page.css";
import quizAppIcon from "/app-icon.svg";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="index-container">
      <div className="index-title">Navid Elyasi</div>
      <div className="index-content">
        <button
          className="index-button"
          onClick={() => {
            navigate("/cv");
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
          <img src={quizAppIcon} className="logo" alt="Vite logo" />
          <li style={{ fontSize: "0.9rem" }}>
            This App enables users to practice persian language.
          </li>
          <li style={{ fontSize: "0.9rem" }}>
            Users can create free account with email and password.
          </li>
          <li style={{ fontSize: "0.9rem" }}>
            Users can practice a unit of topics and take the quiz on each topic.
          </li>
          <li style={{ fontSize: "0.9rem" }}>
            Users can submit their answers to our database and see their
            progress.
          </li>
        </button>
      </div>
    </div>
  );
}
