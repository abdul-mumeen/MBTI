import React from "react";

import "./index.scss";

interface QuestionProps {
  questionKey: string;
  updateValue: (questionKey: string, value: number) => void;
  question: string;
}

const Question = ({ questionKey, updateValue, question }: QuestionProps) => {
  const radios = [1, 2, 3, 4, 5, 6, 7];
  const handleOptionChange = (event: any) => {
    console.log(event.target.value);
    updateValue(questionKey, event.target.value);
  };
  return (
    <>
      <div className="question-title">
        <span>{question}</span>
      </div>
      <div className="radios-container" onChange={handleOptionChange}>
        <span>Disagree</span>
        {radios.map((radio) => (
          <input type="radio" key={radio} name={questionKey} value={radio} />
        ))}
        <span>Agree</span>
      </div>
    </>
  );
};

export default Question;
