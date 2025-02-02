import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../hooks/initFirebase.jsx";
import { useAuth } from "../hooks/AuthContext.jsx";
import { useQuiz } from "../hooks/QuizContext.jsx";
import AdultsMenu from "../components/menu-components/AdultsMenu.jsx";
import KidsMenu from "../components/menu-components/KidsMenu.jsx";
import GamesMenu from "../components/menu-components/GamesMenu.jsx";
import "../styles/pages-styles/menu-page.css";
import { FaUser, FaSignOutAlt, FaStar } from "react-icons/fa";

export default function Menu() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "adults"
  );
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

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("ERROR in logout (from menu page) : ", error);
    }
  }

  const changeTab = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab); // Save tab state
  };

  return (
    <div className="main-menu-container">
      {/* Navbar */}
      <nav className="menu-nav">
        <button
          className={`menu-nav-button ${
            activeTab === "adults" ? "active" : ""
          }`}
          onClick={() => changeTab("adults")}
        >
          Adults
        </button>
        <button
          className={`menu-nav-button ${activeTab === "kids" ? "active" : ""}`}
          onClick={() => changeTab("kids")}
        >
          Kids
        </button>
        <button
          className={`menu-nav-button ${activeTab === "games" ? "active" : ""}`}
          onClick={() => changeTab("games")}
        >
          Games
        </button>
        {/* _______________________ logout _______________________ */}
        <button className="logout-button" onClick={handleLogout}>
          <div className="menu-button-content">
            <FaSignOutAlt style={{ marginRight: "5px" }} />
            Logout
          </div>
        </button>
      </nav>
      <div className="welcome-text">
        Welcome, {username}!
        <FaUser style={{ marginRight: "5px" }} />
        {status &&
          status.map((_, index) => (
            <FaStar key={index} style={{ marginRight: "5px", color: "gold" }} />
          ))}
      </div>
      {/* ___________________ Render the selected tab ___________________ */}
      <div className="tab-content">
        {activeTab === "adults" && <AdultsMenu status={status} />}
        {activeTab === "kids" && <KidsMenu />}
        {activeTab === "games" && <GamesMenu />}
      </div>

      {/* _______________________ Loading  _______________________ */}
      {status === null && (
        <div className="overlay-content">
          <div className="general-text">Loading ...</div>
        </div>
      )}
    </div>
  );
}
