import React, { useState, useRef } from "react";
import VirtualKeyboard from "./subComponents/VirtualKeyboard";
import "../styles/topic.css";

// _____ quizId _____ is like "adults_3"
// _____ questionData _____ is the question object
// _____ answers _____ is the answers object answers.[index]
// _____ handleAnswerChange _____ is a function that updates the answers in the parent component
// _____ handleAnswerChange(subQuestionId, value)
function Topic({ quizId, questionData, answers, handleAnswerChange }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(true);
  const activeInputRef = useRef(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  // Function to open the modal picture with the clicked image
  function openPicture(imageSrc) {
    setModalImageSrc(imageSrc);
    setModalOpen(true);
  }

  // Function to close the modal picture when clicking outside the image
  function closePicture() {
    setModalOpen(false);
    setModalImageSrc("");
  }

  const handleKeyPress = (letter) => {
    if (activeInputRef.current) {
      const fieldName = activeInputRef.current.name;
      const currentAnswer = answers?.[fieldName] || "";
      if (letter === "<-") {
        if (currentAnswer.length > 0) {
          handleAnswerChange(
            fieldName,
            currentAnswer.substring(0, currentAnswer.length - 1)
          );
        }
      } else {
        handleAnswerChange(fieldName, currentAnswer.concat(letter));
      }
    }
  };

  return (
    <div
      className={`topic-question-container ${
        isShowKeyboard ? "is-keyboard-visible" : ""
      }`}
    >
      <div className="title-container">
        {/* _________________ show picture ? ______________ */}
        {questionData.picture !== "no" && (
          <img
            src={`/pictures/${quizId}/${questionData.picture}.png`}
            alt={questionData.picture}
            className="question-picture"
            onClick={() =>
              openPicture(`/pictures/${quizId}/${questionData.picture}.png`)
            }
          />
        )}
        {/* _____________ Titles  _______________________ */}
        <div className="titles">
          <div className="question-title">{questionData.title1}</div>
          <div className="question-title">{questionData.title2}</div>
          {questionData.picture !== "no" && (
            <div className="question-title">
              click on the picture to see the picture bigger :)
            </div>
          )}
        </div>
      </div>
      {/* ______________      Sub questions ______________  */}
      <div className="sub-questions">
        {questionData.data.map((subQuestion, index) => (
          <div
            key={index}
            className={`sub-question ${
              questionData.shortAnswers ? "short" : ""
            }`}
          >
            <h3 className="sub-title">{subQuestion.text}</h3>
            <textarea
              name={index}
              className={`answer-box ${
                questionData.shortAnswers ? "short" : ""
              }`}
              placeholder="جواب شما در اینجا"
              value={answers[index] || ""}
              onFocus={(e) => (activeInputRef.current = e.target)}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* ______   show the picture full screen ___________  */}
      {isModalOpen && (
        <div id="modal" className="modal-overlay" onClick={closePicture}>
          <img src={modalImageSrc} alt="Enlarged" className="modal-image" />
        </div>
      )}

      {/* ______     button to show Virtual Keyboard */}
      <button
        className={`button-v-keyboard ${isShowKeyboard && "active"}`}
        onClick={() => setIsShowKeyboard(!isShowKeyboard)}
      >
        {isShowKeyboard ? "Hide" : "Show Virtual Keyboard"}
      </button>

      {/* _______     showing Virtual Keyboard */}
      {isShowKeyboard && (
        <VirtualKeyboard isShowKeyboard handleKeyPress={handleKeyPress} />
      )}
    </div>
  );
}

export default React.memo(Topic);
