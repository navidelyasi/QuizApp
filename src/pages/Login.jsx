import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";
import { playlevelpassed } from "../hooks/handleSoundEffects.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    playlevelpassed();
    navigate("/menu");
  };

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) {
      navigate("/menu");
    }
  }, []);

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome Back</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          className="login-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        />
        <button className="general-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
