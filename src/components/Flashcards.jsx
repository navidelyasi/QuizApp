import React, { useState } from "react";
import "../styles/flashcards.css";
import { playinterface12 } from "../hooks/handleSoundEffects";
// _____ quizId _____ is like "adults_3"
// _____ questionData _____ is the question object
function Flashcards({ quizId, questionData }) {
  const [isFlipped, setIsFlipped] = useState(
    new Array(questionData.data.length).fill(false)
  );

  const handleFlip = (index) => {
    playinterface12();
    setIsFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <div className="card-question-container">
      <div className="card-question-title">{questionData.title}</div>
      {questionData.data.map((card, cardIndex) => (
        <div
          className="card-content"
          key={card.tag}
          onClick={() => handleFlip(cardIndex)}
        >
          <div className={`flashcard ${isFlipped[cardIndex] ? "flipped" : ""}`}>
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <img
                  src={`/pictures/${quizId}/${card.tag}.png`}
                  alt={card.tag}
                />
              </div>
              <div className="flashcard-back">
                <h2>{card.back}</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(Flashcards);
