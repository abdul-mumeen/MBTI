import { Question, Result } from "./types";

const FETCH_QUESTIONS = "questions/fetch";
const UPDATE_QUESTIONS = "questions/update";
const FETCH_QUESTIONS_ERROR = "questions/error";

const FETCH_RESULT = "result/fetch";
const UPDATE_RESULT = "result/update";
const FETCH_RESULT_ERROR = "result/error";

const POST_ANSWERS = "answers/post";
const POST_ANSWERS_ERROR = "answers/error";

// Action creators
const fetchQuestions = () => {
  return {
    type: FETCH_QUESTIONS as typeof FETCH_QUESTIONS,
  };
};

const fetchQuestionsError = () => {
  return {
    type: FETCH_QUESTIONS_ERROR as typeof FETCH_QUESTIONS_ERROR,
  };
};

const updateQuestions = (questions: Question[]) => {
  return {
    type: UPDATE_QUESTIONS as typeof UPDATE_QUESTIONS,
    payload: { questions },
  };
};

const fetchResult = () => {
  return {
    type: FETCH_RESULT as typeof FETCH_RESULT,
  };
};

const fetchResultError = () => {
  return {
    type: FETCH_RESULT_ERROR as typeof FETCH_RESULT_ERROR,
  };
};

const updateResult = (result: Result) => {
  return {
    type: UPDATE_RESULT as typeof UPDATE_RESULT,
    payload: { result },
  };
};

const postAnswers = () => {
  return {
    type: POST_ANSWERS as typeof POST_ANSWERS,
  };
};

const postAnswersError = () => {
  return {
    type: POST_ANSWERS_ERROR as typeof POST_ANSWERS_ERROR,
  };
};

export type Actions =
  | ReturnType<typeof fetchQuestions>
  | ReturnType<typeof fetchQuestionsError>
  | ReturnType<typeof updateQuestions>
  | ReturnType<typeof fetchResult>
  | ReturnType<typeof fetchResultError>
  | ReturnType<typeof updateResult>
  | ReturnType<typeof postAnswers>
  | ReturnType<typeof postAnswersError>;

export {
  fetchQuestions,
  fetchQuestionsError,
  updateQuestions,
  fetchResult,
  fetchResultError,
  updateResult,
  postAnswers,
  postAnswersError,
};
