import React, { useEffect, useState } from "react";

import QuestionContainer from "./QuestionContainer";
import Question from "./Question";
import Email from "./Email";

import "./index.scss";

interface Answer {
  questionId: number;
  answer: number;
}

interface AnswersData {
  [questionId: string]: Answer;
}

interface Question {
  questionId: number;
  question: string;
}

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answersData, setAnswersData] = useState<AnswersData>({});
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    fetch("/questions").then(async (response) => {
      try {
        const data = await response.json();
        setQuestions(data.message);
        console.log(data.message);
      } catch {
        setQuestions([]);
      }
    });
  }, []);

  // const questions = [
  //   "You find it takes effort to introduce yourself to other people",
  //   "You consider yourself more practical than creative.",
  //   "Winning a debate matters less to you than making sure no one gets upset.",
  //   "You get energized going to social events that involve many interactions.",
  //   "You often spend time exploring unrealistic and impractical yet intriguing ideas.",
  //   "Deadlines seem to you to be of relative rather than absolute importance.",
  //   "Logic is usually more important than heart when it comes to making important decisions.",
  //   "Your home and work environments are quite tidy.",
  //   "You do not mind being at the center of attention.",
  //   "Keeping your options open is more important than having a to-do list.",
  // ];

  const perspectives = [
    { name: "EI", left: "Introversion (I)", right: "Extroversion (E)" },
    { name: "SN", left: "Sensing (S)", right: "Intuition (N)" },
    { name: "TF", left: "Thinking (T)", right: "Feeling (F)" },
    { name: "JP", left: "Judging (J)", right: "Perceiving (P)" },
  ];

  const handleDataUpdate = (key: string, value: number) => {
    setErrorMessage("");
    const newData: AnswersData = {
      ...answersData,
      [key]: { questionId: parseInt(key), answer: value },
    };
    setAnswersData(newData);
  };

  const handleEmailUpdate = (value: string) => {
    setErrorMessage("");
    setEmail(value);
  };

  const isAnswerIncomplete = () => {
    for (const question of questions) {
      if (answersData[question.question_id.toString()] === undefined) {
        return true;
      }
    }
    return false;
  };

  const isEmailInvalid = () => {
    return !emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (isAnswerIncomplete()) {
      setErrorMessage("All questions must be answered!");
      return;
    }
    if (isEmailInvalid()) {
      setErrorMessage("Enter a valid Email Address!");
      return;
    }
    console.log("Current data", answersData);
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
                questionKey={question.question_id.toString()}
                updateValue={handleDataUpdate}
                question={question.question}
              />
            </QuestionContainer>
          ))}
          <QuestionContainer>
            <Email updateEmail={handleEmailUpdate} />
          </QuestionContainer>
        </div>
        <div className={!!errorMessage ? "error show" : "error hide"}>
          {errorMessage}
        </div>
        <button className="save-button" onClick={handleSubmit}>
          {"Save & Continue"}
        </button>
      </div>
    </div>
  );
};

export default QuestionsPage;
