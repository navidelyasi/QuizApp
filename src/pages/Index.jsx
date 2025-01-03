import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="index-container">
      <div className="index-title">This is Navid Elyasi website</div>
      <div className="index-title">Here is my CV</div>
      <button className="index-button" onClick={() => navigate("/login")}>
        See the Quiz App
      </button>
    </div>
  );
}
