import React from "react";
import "../styles/fill-input.css";

// _____ quizId _____ is like "adults_3"
// _____ questionData _____ is the question object
// _____ answers _____ is the answers object answers.[index]
// _____ handleAnswerChange _____ is a function that updates the answers in the parent component
// _____ handleAnswerChange(subQuestionId, value)
// _____ handleSubmitOneQuestion _____ is a function that updates the answers in the parent component
// _____ it adds "submitted" value to the answers onject
export default function FillInput({
  questionData,
  answers,
  handleAnswerChange,
  handleSubmitOneQuestion,
}) {
  return (
    <div className="fill-input-container">
      <h2>{questionData.title}</h2>
      <div className="fill-content">
        {questionData.data.map((paragraph, paragraphIndex) => (
          <p className="paragraph-container" key={paragraphIndex}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
