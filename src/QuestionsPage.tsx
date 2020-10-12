import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import QuestionContainer from "./QuestionContainer";
import QuestionComponent from "./Question";
import Email from "./Email";
import { AnswersData } from "./types";
import { StoreState } from "./store";
import { getQuestions, postUsersAnswers } from "./helper";
import "./index.scss";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const QuestionsPage = () => {
  const questions = useSelector((store: StoreState) => store.reducer.questions);
  const [answersData, setAnswersData] = useState<AnswersData>({});
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getQuestions(dispatch);
  }, [dispatch]);

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
    for (const question of questions.data || []) {
      if (answersData[question.questionId.toString()] === undefined) {
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

    postUsersAnswers(dispatch, email, answersData, history);
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
          {questions.data?.map((question, index) => (
            <QuestionContainer key={index + 1}>
              <QuestionComponent
                questionKey={question.questionId.toString()}
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
