import React from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable, Droppable } from "../hooks/useDragAndDrop";
import QuestionActionButtons from "./subComponents/QuestionActionButtons";
import "../styles/fill-input.css";
import "../styles/sub-styles/drag.css";

// _____ quizId _____ is like "adults_3"
// _____ questionData _____ is the question object
// _____ answers _____ is the answers object answers.[index]
// _____ handleAnswerChange _____ is a function that updates the answers in the parent component
// _____ handleAnswerChange(subQuestionId, value)
// _____ handleSubmitOneQuestion _____ is a function that updates the answers in the parent component
// _____ it adds "submitted" value to the answers onject
function FillInput({
  questionData,
  answers,
  handleAnswerChange,
  handleSubmitOneQuestion,
}) {
  const submitted = answers[questionData.data.length];
  const stack = questionData?.data
    .filter((item) => !Object.values(answers).includes(item.correct))
    .map((item) => item.correct);

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

  return (
    <div className="fill-input-container">
      <DndContext onDragEnd={handleDragEnd}>
        <h2>{questionData.title}</h2>
        {/* ______   stack  ___________ */}
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
        <div className="fill-content">
          {questionData.data.map((paragraph, paragraphIndex) => {
            const parts = paragraph.text.split("@@");
            return (
              <div key={paragraphIndex}>
                <div className="paragraph">
                  <div className="text">{parts[0]}</div>
                  {/* How to display before submitting */}
                  {submitted === "" && (
                    <Droppable id={`drop-${paragraphIndex}`}>
                      {answers[paragraphIndex] === "" ? (
                        <div className="empty-space"></div>
                      ) : (
                        <Draggable
                          key={answers[paragraphIndex]}
                          id={answers[paragraphIndex]}
                        >
                          <div className={"drag-item draggable"}>
                            <p className="drag-text">
                              {answers[paragraphIndex]}
                            </p>
                          </div>
                        </Draggable>
                      )}
                    </Droppable>
                  )}
                  {/* How to display after submitting */}
                  {submitted === "submitted" && (
                    <div
                      className={`drag-item fixed ${
                        answers[paragraphIndex] ===
                        questionData.data[paragraphIndex].correct
                          ? "correct"
                          : "incorrect"
                      }`}
                    >
                      <p className="drag-text">
                        {answers[paragraphIndex] || "-----------"}
                      </p>
                    </div>
                  )}
                  {/* How to display after show-answers */}
                  {submitted === "show-answers" && (
                    <>
                      {answers[paragraphIndex] === "" && (
                        <div className="empty-space drag-item fixed incorrect">
                          -----------
                        </div>
                      )}
                      {answers[paragraphIndex] && (
                        <div
                          className={`drag-item fixed ${
                            answers[paragraphIndex] ===
                            questionData.data[paragraphIndex].correct
                              ? "correct"
                              : "incorrect"
                          }`}
                        >
                          <p className="drag-text">{answers[paragraphIndex]}</p>
                        </div>
                      )}
                      {answers[paragraphIndex] !==
                        questionData.data[paragraphIndex].correct && (
                        <div className="drag-item fixed correct">
                          <p className="drag-text">
                            {questionData.data[paragraphIndex].correct}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  <div className="text">{parts[1]}</div>
                </div>
              </div>
            );
          })}
        </div>
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

export default React.memo(FillInput);
