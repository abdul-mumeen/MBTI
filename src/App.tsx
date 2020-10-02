import React, { useEffect, useState } from "react";

import QuestionContainer from "./QuestionContainer";
import Question from "./Question";

import "./index.scss";

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");

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

  const questions = [1, 2, 3, 4];

  return (
    <div className="App">
      <div className="questions-page">
        <div className="discover-title">
          <p>Discover Your Perspective</p>
          <span>
            Complete the 7 min test and get a detailed report of your lenses on
            the world.
          </span>
        </div>
        <div className="questions-container">
          <div className="questions">
            {questions.map((question) => (
              <QuestionContainer key={question}>
                <Question
                  questionKey={question.toString()}
                  updateValue={() => {}}
                  question={question.toString()}
                />
              </QuestionContainer>
            ))}
          </div>
        </div>
      </div>
      <div className="result-page"></div>
    </div>
  );
}

export default App;
