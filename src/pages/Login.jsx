import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/index.css";
import { playlevelpassed } from "../hooks/handleSoundEffects.jsx";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../hooks/initFirebase.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    try {
      const userDoc = doc(db, "quiz-answers", username);
      await setDoc(userDoc, {
        firstLogin: new Date().toISOString(),
      });
      console.log("DONE");
    } catch (error) {
      console.log("ERROR : ", error);
    }
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
