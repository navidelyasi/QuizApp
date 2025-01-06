import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable, Droppable } from "../hooks/useDragAndDrop";
import QuestionActionButtons from "./subComponents/QuestionActionButtons";
import "../styles/sub-styles/drag.css";
import "../styles/topic.css";

// _____ quizId _____ is like "adults_3"
// _____ questionData _____ is the question object
// _____ answers _____ is the answers object answers.[index]
// _____ handleAnswerChange _____ is a function that updates the answers in the parent component
// _____ handleAnswerChange(subQuestionId, value)
// _____ handleSubmitOneQuestion _____ is a function that updates the answers in the parent component
// _____ it adds "submitted" value to the answers onject
function TopicDrag({
  quizId,
  questionData,
  answers,
  handleAnswerChange,
  handleSubmitOneQuestion,
}) {
  const submitted = answers[questionData.data.length];
  const stack = questionData?.data
    .filter((item) => !Object.values(answers).includes(item.correct))
    .map((item) => item.correct)
    .sort(() => Math.random() - 0.5);

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

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    // Get the index from the droppable ID (removing 'drop-' prefix)
    const dropIndex = parseInt(over.id.replace("drop-", ""));

    // If dragging from an answer spot, clear that spot first
    Object.entries(answers).forEach(([index, value]) => {
      if (value === active.id) {
        handleAnswerChange(index, "");
      }
    });

    // Update the new position
    handleAnswerChange(dropIndex, active.id);
  }

  function getScore() {
    let score = 0;
    for (let i = 0; i < questionData.data.length; i++) {
      if (answers[i] === questionData.data[i].correct) {
        score++;
      }
    }
    return score;
  }

  console.log("questionData ______________________", questionData);
  console.log("answers ______________________", answers);

  return (
    <div className="topic-question-container">
      <DndContext onDragEnd={handleDragEnd}>
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
            {/* ______________ draggable stack ______________ */}
            <div className="draggable-stack">
              {stack.map((text) =>
                submitted === "" ? (
                  <Draggable key={text} id={text}>
                    <div className="drag-item draggable">
                      <p className="drag-text">{text}</p>
                    </div>
                  </Draggable>
                ) : (
                  <div className="drag-item fixed">
                    <p className="drag-text">{text}</p>
                  </div>
                )
              )}
            </div>
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
              {/* How to display before submitting */}
              {submitted === "" && (
                <Droppable id={`drop-${index}`}>
                  {answers[index] === "" ? (
                    <div className="empty-space"></div>
                  ) : (
                    <Draggable key={answers[index]} id={answers[index]}>
                      <div className={"drag-item draggable"}>
                        <p className="drag-text">{answers[index]}</p>
                      </div>
                    </Draggable>
                  )}
                </Droppable>
              )}
              {/* How to display after submitting */}
              {submitted === "submitted" && (
                <div
                  className={`drag-item fixed ${
                    answers[index] === questionData.data[index].correct
                      ? "correct"
                      : "incorrect"
                  }`}
                >
                  <p className="drag-text">{answers[index] || "-----------"}</p>
                </div>
              )}
              {/* How to display after show-answers */}
              {submitted === "show-answers" && (
                <>
                  {answers[index] === "" && (
                    <div className="empty-space drag-item fixed incorrect">
                      -----------
                    </div>
                  )}
                  {answers[index] && (
                    <div
                      className={`drag-item fixed ${
                        answers[index] === questionData.data[index].correct
                          ? "correct"
                          : "incorrect"
                      }`}
                    >
                      <p className="drag-text">{answers[index]}</p>
                    </div>
                  )}
                  {answers[index] !== questionData.data[index].correct && (
                    <div className="drag-item fixed correct">
                      <p className="drag-text">
                        {questionData.data[index].correct}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* ______   show the picture full screen ___________  */}
        {isModalOpen && (
          <div id="modal" className="modal-overlay" onClick={closePicture}>
            <img src={modalImageSrc} alt="Enlarged" className="modal-image" />
          </div>
        )}
      </DndContext>
      <QuestionActionButtons
        submitted={submitted}
        handleSubmitOneQuestion={handleSubmitOneQuestion}
        questionLength={questionData.data.length}
        getScore={getScore}
      />
    </div>
  );
}

export default React.memo(TopicDrag);
