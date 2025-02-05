import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { halloweenData } from "../../data/gamesData.js";
import {
  playspookywiththunder,
  playdiceroll,
  playsuccess2,
  playhalloweenimpact,
  playlevelpassed,
  playnotification2,
} from "../../hooks/handleSoundEffects.jsx";
import "../../styles/games-styles/halloween.css";
import {
  FaRegSmileBeam,
  FaRocket,
  FaStar,
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from "react-icons/fa";

const upPositions = [7, 14, 21, 28, 35, 42, 49, 56, 63, 70];
const pumpkinsPositions = [5, 13, 26, 37, 40, 51, 58, 59, 73];

function Halloween() {
  const navigate = useNavigate();
  const { id } = useParams();
  const levelPassedRef = useRef(0);
  const [numPlayers, setNumPlayers] = useState(null);
  const [activePlayer, setActivePlayer] = useState(1);
  const movingIntervalRef = useRef(null);
  const playersPositionsRef = useRef(null);
  const [, forceUpdate] = useState(0);
  const [moving, setMoving] = useState(false);

  const [diceNumber, setDiceNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [questionOverlay, setQuestionOverlay] = useState(false);
  const selectedQuestionRef = useRef(0);

  useEffect(() => {
    playspookywiththunder();
  }, []);

  const startGame = (num) => {
    setNumPlayers(num);
    playnotification2();

    if (num === 2) {
      playersPositionsRef.current = [
        { left: 1, top: 523, position: 1 },
        { left: 31, top: 547, position: 1 },
      ];
    } else if (num === 3) {
      playersPositionsRef.current = [
        { left: 1, top: 523, position: 1 },
        { left: 31, top: 547, position: 1 },
        { left: 31, top: 523, position: 1 },
      ];
    } else {
      playersPositionsRef.current = [
        { left: 1, top: 523, position: 1 },
        { left: 31, top: 547, position: 1 },
        { left: 31, top: 523, position: 1 },
        { left: 1, top: 547, position: 1 },
      ];
    }
  };

  function movePlayerForward() {
    let newPositions = [...playersPositionsRef.current];
    let { left, top, position } = newPositions[activePlayer - 1];

    // should go up ?
    if (upPositions.includes(position)) {
      top -= 53;
    } else if (Math.floor(position / 7) % 2 === 1) {
      // need go to left
      left -= 61;
    } else {
      left += 61;
    }
    position += 1;

    // Update ref value instantly
    newPositions[activePlayer - 1] = { left, top, position };
    playersPositionsRef.current = newPositions;

    // check if player reached finish
    if (position === 77) {
      levelPassedRef.current = activePlayer;
      playlevelpassed();
    }

    // Force UI update after movement
    forceUpdate((prev) => prev + 1);
  }

  const rollDice = () => {
    if (levelPassedRef.current > 0) return;
    playdiceroll();
    setIsRolling(true);
    setMoving(true);

    // Simulate dice roll animation
    setTimeout(() => {
      const newNumber = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(newNumber);
      setIsRolling(false);

      //   if screen is small, then scroll to bottom
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

      let newPositions = [...playersPositionsRef.current];
      let { left, top, position } = newPositions[activePlayer - 1];

      if (position + newNumber > 77) {
        playhalloweenimpact();
        setMoving(false);
        setActivePlayer((prev) => (prev === numPlayers ? 1 : prev + 1));
      } else {
        // Move player based on dice number
        let stepCount = 0;
        movingIntervalRef.current = setInterval(() => {
          movePlayerForward();
          stepCount++;
          if (stepCount >= newNumber) {
            clearInterval(movingIntervalRef.current);
            movingIntervalRef.current = null;
            if (levelPassedRef.current > 0) return;
            checkLadder();
            checkPumpkin();
          }
        }, 500);
      }
    }, 1000);
  };

  function checkLadder() {
    let newPositions = [...playersPositionsRef.current];
    let { left, top, position } = newPositions[activePlayer - 1];

    if (position === 3) {
      left = left + 61;
      top = top - 106;
      position = 18;

      newPositions[activePlayer - 1] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    } else if (position === 23) {
      left = left - 61;
      top = top - 106;
      position = 38;

      newPositions[activePlayer - 1] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    } else if (position === 42) {
      left = left + 61;
      top = top - 106;
      position = 55;

      newPositions[activePlayer - 1] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    } else if (position === 53) {
      left = left + 61;
      top = top - 106;
      position = 66;

      newPositions[activePlayer - 1] = { left, top, position };
      playersPositionsRef.current = newPositions;

      forceUpdate((prev) => prev + 1);
      playsuccess2();
    }
  }

  function checkPumpkin() {
    let newPositions = [...playersPositionsRef.current];
    let { left, top, position } = newPositions[activePlayer - 1];

    if (pumpkinsPositions.includes(position)) {
      selectedQuestionRef.current =
        Math.floor(Math.random() * halloweenData.length) + 1;

      setQuestionOverlay(true);
      playhalloweenimpact();
    } else {
      setMoving(false);
      setActivePlayer((prev) => (prev === numPlayers ? 1 : prev + 1));
    }
  }

  function submitAnswer(answer) {
    setQuestionOverlay(false);
    if (answer === halloweenData[selectedQuestionRef.current].correct) {
      setMoving(false);
      playlevelpassed();
    } else {
      setMoving(false);
      setActivePlayer((prev) => (prev === numPlayers ? 1 : prev + 1));
    }
  }

  return (
    <div
      className="halloween-container-main"
      style={{
        backgroundColor:
          activePlayer === 1
            ? "var(--color-primary)"
            : activePlayer === 2
            ? "var(--color-success)"
            : activePlayer === 3
            ? "var(--color-red)"
            : "var(--color-light)",
      }}
    >
      {/* Navigation Bar */}
      <nav className="halloween-game-nav">
        <div className="halloween-game-title score">count</div>
        <div className="halloween-game-title">Halloween {id}</div>
        <button
          className="halloween-game-exit-button"
          onClick={() => navigate("/menu")}
        >
          Exit
        </button>
      </nav>

      <div className="halloween-game-container">
        <div>
          <h1
            style={{
              textAlign: "center",
            }}
          >
            active player is {activePlayer}
          </h1>
          {/*    _______    MOVE buttons    _________     */}
          {numPlayers && (
            <div className="players-info-container">
              {Array(numPlayers)
                .fill()
                .map((_, index) => (
                  <button
                    key={index}
                    className={`move-button
                    ${
                      index === 0
                        ? "one"
                        : index === 1
                        ? "two"
                        : index === 2
                        ? "three"
                        : "four"
                    }
                    `}
                    disabled={activePlayer !== index + 1 || moving}
                    onClick={() => rollDice()}
                  >
                    player {index + 1}
                    <div
                      className="player-token"
                      style={{
                        position: "relative",
                        marginLeft: "5px",
                        backgroundColor:
                          index === 0
                            ? "var(--color-primary)"
                            : index === 1
                            ? "var(--color-success)"
                            : index === 2
                            ? "var(--color-red)"
                            : "var(--color-light)",
                      }}
                    >
                      <FaRegSmileBeam
                        style={{
                          color: "var(--color-xdark)",
                          width: "26px",
                          height: "26px",
                        }}
                      />
                    </div>
                  </button>
                ))}
            </div>
          )}
          {/*     _________         Dice           ______ */}
          <div className="dice-container">
            {diceNumber === 1 && (
              <FaDiceOne className={`dice ${isRolling ? "rolling" : ""}`} />
            )}
            {diceNumber === 2 && (
              <FaDiceTwo className={`dice ${isRolling ? "rolling" : ""}`} />
            )}
            {diceNumber === 3 && (
              <FaDiceThree className={`dice ${isRolling ? "rolling" : ""}`} />
            )}
            {diceNumber === 4 && (
              <FaDiceFour className={`dice ${isRolling ? "rolling" : ""}`} />
            )}
            {diceNumber === 5 && (
              <FaDiceFive className={`dice ${isRolling ? "rolling" : ""}`} />
            )}
            {diceNumber === 6 && (
              <FaDiceSix className={`dice ${isRolling ? "rolling" : ""}`} />
            )}
          </div>
        </div>
        {/*       _________       GAME Board             ______    */}
        <div className="halloween-board-container">
          <img
            src="/pictures/general/halloween/halloween-board-game.png"
            alt="halloween-board-game"
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />

          {numPlayers &&
            [...Array(numPlayers)].map((_, index) => (
              <div
                key={index}
                className="player-token"
                style={{
                  left: `${playersPositionsRef.current[index].left}px`,
                  top: `${playersPositionsRef.current[index].top}px`,
                  backgroundColor:
                    index === 0
                      ? "var(--color-primary)"
                      : index === 1
                      ? "var(--color-success)"
                      : index === 2
                      ? "var(--color-red)"
                      : "var(--color-light)",
                }}
              >
                <FaRegSmileBeam
                  style={{
                    color: "var(--color-xdark)",
                    width: "26px",
                    height: "26px",
                  }}
                />
              </div>
            ))}
        </div>
      </div>

      {/*  ___    Overlay        ___     Question                     ______ */}
      {questionOverlay && (
        <div className="overlay-halloween-game">
          <div className="overlay-halloween-game-content">
            <h1>{halloweenData[selectedQuestionRef.current].question}</h1>
            {halloweenData[selectedQuestionRef.current].answers.map((q, i) => (
              <button
                key={i}
                className="overlay-halloween-button-replay"
                onClick={() => submitAnswer(i)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/*  ___    Overlay        ___     starting GAME ___ get players number */}
      {numPlayers === null && (
        <div className="overlay-halloween-game">
          <div className="overlay-halloween-game-content">
            <h1>Select Number of Players</h1>
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                className="overlay-halloween-button-replay"
                onClick={() => startGame(num)}
              >
                {num} Players
              </button>
            ))}
          </div>
        </div>
      )}

      {/*  ___    Overlay        ___     GAME is Finished        ____________ */}
      {levelPassedRef.current > 0 && (
        <div className="overlay-halloween-game">
          <div className="overlay-halloween-game-content">
            <h1>
              player {activePlayer} won the game
              <FaRocket style={{ color: "orange", marginLeft: "10px" }} />
              <FaStar style={{ color: "yellow", marginLeft: "5px" }} />
            </h1>
            <button
              className="overlay-halloween-button-replay"
              onClick={() => {
                levelPassedRef.current = 0;
                setNumPlayers(null);
                setActivePlayer(1);
                setDiceNumber(1);
                setMoving(false);
                playersPositionsRef.current = null;
              }}
            >
              Replay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Halloween;
