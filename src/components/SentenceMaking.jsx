import React from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable, Droppable } from "../hooks/useDragAndDrop";
import QuestionActionButtons from "./subComponents/QuestionActionButtons";
import "../styles/sentence-making.css";
import "../styles/drag-pairs.css";

// _____ questionData _____ is the question object
// _____ answers _____ is the answers object answers.[index]
// _____ handleAnswerChange _____ is a function that updates the answers in the parent component
// _____ handleAnswerChange(subQuestionId, value)
// _____ handleSubmitOneQuestion _____ is a function that updates the answers in the parent component
// _____ it adds "submitted" value to the answers onject
function SentenceMaking({
  questionData,
  answers,
  handleAnswerChange,
  handleSubmitOneQuestion,
}) {
  const submitted = answers[questionData.data.length];
  const stack = questionData?.data.map((sentence, sentenceIndex) =>
    sentence.text.filter(
      (word) => !Object.values(answers[sentenceIndex]).includes(word)
    )
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    // where the item is picked up from
    const activeIdSentence = parseInt(active.id[0]);
    const activeIdWord = parseInt(active.id[1]);

    // where the item is dropped
    const dropIndex = over.id.replace("drop-", "");
    const dropIndexSentence = parseInt(dropIndex[0]);
    const dropIndexWord = parseInt(dropIndex[1]);

    // if user is dragging a word from one sentence to a different sentence, do nothing
    if (activeIdSentence !== dropIndexSentence) return;

    const newAnswers = answers;
    // remove the word from the old position (if it is not from the stack)
    if (activeIdWord !== "s") {
      newAnswers[activeIdSentence][activeIdWord] = "";
    }
    // add the word to the new position
    newAnswers[dropIndexSentence][dropIndexWord] = active.id.slice(2);

    // Update the new position
    handleAnswerChange(dropIndexSentence, newAnswers);
  }

  function getScore() {
    let score = 0;
    for (let i = 0; i < questionData.data.length; i++) {
      let correct = true;
      for (let j = 0; j < questionData.data[i].correct.length; j++) {
        if (answers[i][j] !== questionData.data[i].correct[j]) {
          correct = false;
        }
      }
      if (correct) {
        score++;
      }
    }
    return score;
  }

  return (
    <div className="sentence-making-container">
      <div className="sentence-making-title">{questionData.title1}</div>
      <div className="sentence-making-title">{questionData.title2}</div>
      <DndContext onDragEnd={handleDragEnd}>
        {questionData.data.map((sentence, sentenceIndex) => (
          <div className="sentence-container" key={sentenceIndex}>
            <div className="stack-sentence-making" key={sentenceIndex}>
              {stack[sentenceIndex].map((stackText) =>
                submitted === "" ? (
                  <Draggable
                    key={String(sentenceIndex) + "s" + stackText}
                    id={String(sentenceIndex) + "s" + stackText}
                  >
                    <div className="drag-item draggable">
                      <p className="drag-text">{stackText}</p>
                    </div>
                  </Draggable>
                ) : (
                  <div className="drag-item fixed">
                    <p className="drag-text">{stackText}</p>
                  </div>
                )
              )}
            </div>
            <div className="sentence-line">
              {sentence.correct.map((correctWord, wordIndex) => (
                <div key={String(sentenceIndex) + String(wordIndex)}>
                  {/* _________________________________ */}
                  {/*  How to display before submitting */}
                  {/* _________________________________ */}
                  {submitted === "" && (
                    <Droppable
                      id={`drop-${String(sentenceIndex) + String(wordIndex)}`}
                    >
                      {answers[sentenceIndex][wordIndex] === "" ? (
                        <div className="empty-space"></div>
                      ) : (
                        <Draggable
                          key={
                            String(sentenceIndex) +
                            String(wordIndex) +
                            answers[sentenceIndex][wordIndex]
                          }
                          id={
                            String(sentenceIndex) +
                            String(wordIndex) +
                            answers[sentenceIndex][wordIndex]
                          }
                        >
                          <div className={"drag-item draggable"}>
                            <p className="drag-text">
                              {answers[sentenceIndex][wordIndex]}
                            </p>
                          </div>
                        </Draggable>
                      )}
                    </Droppable>
                  )}
                  {/* _________________________________ */}
                  {/*   How to display after submitting */}
                  {/* _________________________________ */}
                  {submitted === "submitted" && (
                    <div
                      className={`drag-item fixed ${
                        answers[sentenceIndex][wordIndex] === correctWord
                          ? "correct"
                          : "incorrect"
                      }`}
                    >
                      <p className="drag-text">
                        {answers[sentenceIndex][wordIndex] || ""}
                      </p>
                    </div>
                  )}
                  {/* _________________________________ */}
                  {/* How to display after show-answers */}
                  {/* _________________________________ */}
                  {submitted === "show-answers" && (
                    <>
                      {answers[sentenceIndex][wordIndex] && (
                        <div
                          className={`drag-item fixed ${
                            answers[sentenceIndex][wordIndex] === correctWord
                              ? "correct"
                              : "incorrect"
                          }`}
                        >
                          <p className="drag-text">
                            {answers[sentenceIndex][wordIndex]}
                          </p>
                        </div>
                      )}
                      {answers[sentenceIndex][wordIndex] !== correctWord && (
                        <div className="drag-item fixed correct">
                          <p className="drag-text">{correctWord}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
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

export default React.memo(SentenceMaking);
