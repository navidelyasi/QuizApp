import React from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable, Droppable } from "../hooks/useDragAndDrop";
import QuestionActionButtons from "./subComponents/QuestionActionButtons";
import "../styles/drag-pairs.css";

// _____ quizId _____ is like "adults_3"
// _____ questionData _____ is the question object
// _____ answers _____ is the answers object answers.[index]
// _____ handleAnswerChange _____ is a function that updates the answers in the parent component
// _____ handleAnswerChange(subQuestionId, value)
// _____ handleSubmitOneQuestion _____ is a function that updates the answers in the parent component
// _____ it adds "submitted" value to the answers onject
export default function DragPairs({
  questionData,
  answers,
  handleAnswerChange,
  handleSubmitOneQuestion,
}) {
  const submitted = answers[questionData.data.length];
  const stack = questionData?.data
    .filter((item) => !Object.values(answers).includes(item.two))
    .map((item) => item.two);

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
      if (answers[i] === questionData.data[i].two) {
        score++;
      }
    }
    return score;
  }

  const getAnswerStatus = (index) => {
    if (submitted !== "") {
      if (answers[index] === questionData.data[index].two) {
        return "correct";
      } else {
        return "incorrect";
      }
    } else {
      return "";
    }
  };

  return (
    <div className="drag-question-container">
      <DndContext onDragEnd={handleDragEnd}>
        <h2>{questionData?.title}</h2>
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
        {questionData?.data.map((pair, index) => (
          <div className="draggable-line" key={pair.dcid}>
            <div className="drag-item fixed">
              <p className="drag-text">{pair.one}</p>
            </div>
            {/* _________________________________ */}
            {/*  How to display before submitting */}
            {/* _________________________________ */}
            {submitted === "" && (
              <Droppable id={`drop-${index}`}>
                {answers[index] === "" ? (
                  <div className="empty-space"></div>
                ) : (
                  <Draggable key={answers[index]} id={answers[index]}>
                    <div
                      className={`drag-item draggable ${getAnswerStatus(
                        index
                      )}`}
                    >
                      <p className="drag-text">{answers[index]}</p>
                    </div>
                  </Draggable>
                )}
              </Droppable>
            )}
            {/* _________________________________ */}
            {/*   How to display after submitting */}
            {/* _________________________________ */}
            {submitted === "submitted" && (
              <div className={`drag-item fixed ${getAnswerStatus(index)}`}>
                <p className="drag-text">{answers[index] || ""}</p>
              </div>
            )}
            {/* _________________________________ */}
            {/* How to display after show-answers */}
            {/* _________________________________ */}
            {submitted === "show-answers" && (
              <>
                {answers[index] && (
                  <div
                    className={`drag-item fixed ${
                      answers[index] === pair.two ? "correct" : "incorrect"
                    }`}
                  >
                    <p className="drag-text">{answers[index]}</p>
                  </div>
                )}
                {answers[index] !== pair.two && (
                  <div className="drag-item fixed correct">
                    <p className="drag-text">{pair.two}</p>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
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
