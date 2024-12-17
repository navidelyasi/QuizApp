import React, { useState, useRef } from "react";
import VirtualKeyboard from "./VirtualKeyboard";
import "../styles/topic.css";

// _____ quizId is like adults_3
// _____ questionData is the question object
// _____ answers is the answers object
// _____ handleAnswerChange is a function that updates the answers in the parent component
// _____ handleAnswerChange(subQuestionId, value)
export default function Topic({
  quizId,
  questionData,
  answers,
  handleAnswerChange,
}) {
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
    console.log(letter);
    // if (activeInputRef.current) {
    //   const fieldName = activeInputRef.current.name;
    //   const currentAnswer = subAnswers?.[fieldName] || "";
    //   if (letter === "back") {
    //     if (currentAnswer.length > 0) {
    //       onAnswerChange(
    //         fieldName,
    //         currentAnswer.substring(0, currentAnswer.length - 1)
    //       );
    //     }
    //   } else {
    //     onAnswerChange(fieldName, currentAnswer.concat(letter));
    //   }
    // }
  };

  return (
    <div className="topic-question-container">
      {/* _________________ show picture ? ______________ */}
      {questionData.picture !== "no" && (
        <img
          src={`/pictures/${quizId}/${questionData.picture}.png`}
          alt="Bedroom"
          className="question-picture"
          onClick={() =>
            openPicture(`/pictures/${quizId}/${questionData.picture}.png`)
          }
        />
      )}
      {/* _____________ Titles  _______________________ */}
      <div className="title-container">
        <div className="question-title">{questionData.title1}</div>
        <div className="question-title">{questionData.title2}</div>
        <div className="question-title">
          click on the picture to see the picture bigger :)
        </div>
      </div>
      {/* ______________      Sub questions ______________  */}
      <div className="sub-questions">
        {questionData.data.map((subQuestion, index) => (
          <div
            key={index}
            className={
              questionData.shortAnswers ? "short-sub-question" : "sub-question"
            }
          >
            <h3 className="sub-title">{subQuestion}</h3>
            <textarea
              key={index}
              className="answer-box"
              placeholder="جواب شما در اینجا"
              value={answers[questionData.id]?.[index] || ""}
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
        <div className="virtual-keyboard-container">
          <VirtualKeyboard isShowKeyboard handleKeyPress={handleKeyPress} />
        </div>
      )}
    </div>
  );
}
