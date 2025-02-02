import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages-styles/menu-page.css";

function GamesMenu() {
  const navigate = useNavigate();

  function handleClick(id, type) {
    if (type === "card_game") {
      navigate(`/card-game/${id}`);
    }
  }

  return (
    <div className="quiz-buttons">
      <div className="title-text">Flash cards game:</div>
      {[1, 2, 3, 4, 5].map((id) => (
        <div
          className="unit-card game-card"
          key={"card_game_" + id}
          onClick={() => handleClick(id, "card_game")}
        >
          unit {id}
        </div>
      ))}
    </div>
  );
}

export default GamesMenu;
