import { camelizeKeys, decamelizeKeys } from "humps";
import { AnswersData } from "./types";
import {
  fetchQuestions,
  fetchQuestionsError,
  postAnswers,
  postAnswersError,
  updateQuestions,
  updateResult,
} from "./actions";
import { Dispatch } from "react";

export const getQuestions = <T>(dispatch: Dispatch<any>) => {
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
};

export const postUsersAnswers = (
  dispatch: Dispatch<any>,
  email: string,
  answersData: AnswersData,
  history: any
) => {
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
