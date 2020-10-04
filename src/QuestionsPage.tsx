import React, { useEffect, useState } from "react";

import QuestionContainer from "./QuestionContainer";
import Question from "./Question";
import Email from "./Email";

import "./index.scss";

const QuestionsPage = () => {
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [data, setData] = useState<any>({});

  useEffect(() => {
    fetch("/hello").then(async (response) => {
      try {
        const data = await response.json();
        setWelcomeMessage(data.message);
      } catch {
        setWelcomeMessage("");
      }
    });
  }, []);

  const questions = [
    "You find it takes effort to introduce yourself to other people",
    "You consider yourself more practical than creative.",
    "Winning a debate matters less to you than making sure no one gets upset.",
    "You get energized going to social events that involve many interactions.",
    "You often spend time exploring unrealistic and impractical yet intriguing ideas.",
    "Deadlines seem to you to be of relative rather than absolute importance.",
    "Logic is usually more important than heart when it comes to making important decisions.",
    "Your home and work environments are quite tidy.",
    "You do not mind being at the center of attention.",
    "Keeping your options open is more important than having a to-do list.",
  ];

  const perspectives = [
    { name: "EI", left: "Introversion (I)", right: "Extroversion (E)" },
    { name: "SN", left: "Sensing (S)", right: "Intuition (N)" },
    { name: "TF", left: "Thinking (T)", right: "Feeling (F)" },
    { name: "JP", left: "Judging (J)", right: "Perceiving (P)" },
  ];

  const handleDataUpdate = (key: string, value: string | number) => {
    const newData = { ...data, [key]: value };
    setData(newData);
  };

  const handleEmailUpdate = (value: string) => {
    handleDataUpdate("email", value);
  };

  const handleSubmit = () => {
    console.log("Current data", data);
  };

  return (
    <div>
      <div className="discover-title">
        <p>Discover Your Perspective</p>
        <span>
          Complete the 7 min test and get a detailed report of your lenses on
          the world.
        </span>
      </div>
      <div className="questions-container">
        <div className="questions">
          {questions.map((question, index) => (
            <QuestionContainer key={index + 1}>
              <Question
                questionKey={index.toString()}
                updateValue={handleDataUpdate}
                question={question}
              />
            </QuestionContainer>
          ))}
          <QuestionContainer>
            <Email updateEmail={handleEmailUpdate} />
          </QuestionContainer>
        </div>
        <button className="save-button" onClick={handleSubmit}>
          {"Save & Continue"}
        </button>
      </div>
    </div>
  );
};

export default QuestionsPage;
