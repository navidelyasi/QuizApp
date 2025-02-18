import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile.jsx";
import "../styles/pages-styles/index-page.css";
import "../styles/pages-styles/menu-page.css";
import "../styles/menu-styles/game-menu.css";
import quizAppIcon from "/app-icon.svg";

export default function Index() {
  const navigate = useNavigate();
  const [activeIndexTab, setActiveIndexTab] = useState(
    localStorage.getItem("activeIndexTab") || "projects"
  );

  const changeIndexTab = (tab) => {
    setActiveIndexTab(tab);
    localStorage.setItem("activeIndexTab", tab);
  };

  return (
    <div className="index-container">
      <nav className="menu-nav">
        <button
          className={`menu-nav-button ${
            activeIndexTab === "projects" ? "active" : ""
          }`}
          onClick={() => changeIndexTab("projects")}
        >
          Projects
        </button>
        <button
          className={`menu-nav-button ${
            activeIndexTab === "profile" ? "active" : ""
          }`}
          onClick={() => changeIndexTab("profile")}
        >
          About Me
        </button>
      </nav>
      <div className="game-menu-content">
        {activeIndexTab === "projects" && (
          <>
            <button
              onClick={() => {
                navigate(`/halloween-game/1`);
              }}
            >
              Halloween Game
              <div className="game-menu-button-img">
                <img
                  src="/pictures/general/halloween/broom/broom-body.png"
                  alt="broom-body"
                  className="broom-body-menu"
                />

                <img
                  src="/pictures/general/halloween/broom/broom-hat.png"
                  alt="broom-hat"
                  className="broom-hat-menu"
                />
                <img
                  src="/pictures/general/halloween/broom/broom-tail.png"
                  alt="broom-tail"
                  className="broom-tail-menu"
                />

                <img
                  src="/pictures/general/halloween/pumpkin-1.png"
                  alt="pumpkin1"
                  className="shaking-pumpkin-menu"
                />
              </div>
            </button>

            <button className="index-button" onClick={() => navigate("/login")}>
              Lingo Persian App
              <img src={quizAppIcon} className="logo" alt="Vite logo" />
              <div className="index-button-content">
                <div style={{ textAlign: "left" }}>
                  - practice persian language
                </div>
                <div style={{ textAlign: "left" }}>- create free account</div>
                <div style={{ textAlign: "left" }}>- take quiz</div>
                <div style={{ textAlign: "left" }}>- submit your answers</div>
              </div>
            </button>
          </>
        )}

        {activeIndexTab === "profile" && <Profile />}
      </div>
    </div>
  );
}
