import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages-styles/menu-page.css";

function GamesMenu() {
  const navigate = useNavigate();

  function handleClick(id, type) {
    if (type === "card_game") {
      navigate(`/card-game/${id}`);
    } else if (type === "halloween_game") {
      navigate(`/halloween-game/${id}`);
    }
  }

  return (
    <>
      {/*  _______    cards game     _________      */}
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

      {/*  _______    halloween game     _________      */}
      <div className="quiz-buttons">
        <div className="title-text">Halloween game:</div>
        {[1, 2, 3, 4, 5].map((id) => (
          <div
            className="unit-card game-card"
            key={"card_game_" + id}
            onClick={() => handleClick(id, "halloween_game")}
          >
            unit {id}
          </div>
        ))}
      </div>

      {/*  _______    More games     _________      */}
      <div className="quiz-buttons">
        <div className="title-text">More games are under development :)</div>
      </div>
    </>
  );
}

export default GamesMenu;
