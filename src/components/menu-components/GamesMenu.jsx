import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages-styles/menu-page.css";
import "../../styles/menu-styles/game-menu.css";
import Broom from "../subComponents/Broom.jsx";

function GamesMenu() {
  const [selectedGame, setSelectedGame] = useState(null);
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
      <div className="game-menu-content">
        <button
          onClick={() => {
            setSelectedGame("memory");
          }}
        >
          Memory Game
          <div className="game-menu-button-img">
            <img
              src="/pictures/general/memory-game-icon.png"
              alt="memory-game-icon"
              className="memory-game-icon"
            />
          </div>
        </button>

        <button
          onClick={() => {
            setSelectedGame("halloween");
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
      </div>

      {selectedGame && (
        <div
          className="game-menu-overlay"
          onClick={() => setSelectedGame(null)}
        >
          <div className="flying-broom">
            <Broom style={{ scale: "2" }} />
          </div>
          <div className="game-menu-overlay-content">
            <h1>
              Select a unit to play{" "}
              {selectedGame === "memory" ? "Card Game" : "Halloween Game"}
            </h1>
            {/*  _____  cards game  or Halloween   _________      */}
            <div className="quiz-buttons">
              <div className="title-text">units:</div>

              {[1, 2, 3, 4, 5].map((id) => (
                <div
                  className="unit-card game-card"
                  key={"card_game_" + id}
                  onClick={() =>
                    handleClick(
                      id,
                      selectedGame === "memory" ? "card_game" : "halloween_game"
                    )
                  }
                >
                  unit {id}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GamesMenu;
