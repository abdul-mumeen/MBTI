import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { camelizeKeys, decamelizeKeys } from "humps";
import { useHistory } from "react-router-dom";

import QuestionContainer from "./QuestionContainer";
import QuestionComponent from "./Question";
import Email from "./Email";
import { Answer, AnswersData, Result, Question } from "./types";
import {
  fetchQuestions,
  fetchQuestionsError,
  fetchResult,
  fetchResultError,
  postAnswers,
  postAnswersError,
  updateQuestions,
  updateResult,
} from "./actions";
import { StoreState } from "./store";
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
    dispatch(fetchQuestions());
    fetch("/questions").then(async (response) => {
      try {
        const data = await response.json();
        dispatch(
          updateQuestions(
            data.questions.map((question: any) => camelizeKeys(question))
          )
        );
      } catch {
        dispatch(fetchQuestionsError());
      }
    });
  }, []);

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

    dispatch(postAnswers());
    fetch("/answers", {
      method: "POST",
      body: JSON.stringify({
        answers: Object.values(answersData).map((answer) =>
          decamelizeKeys(answer)
        ),
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      try {
        const data = await response.json();
        dispatch(updateResult(data.result));
        history.push("/result");
      } catch {
        dispatch(postAnswersError());
      }
    });
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
