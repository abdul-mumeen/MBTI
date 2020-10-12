export enum AsyncActionStatus {
  Unknown = 0,
  Loading = 1,
  Success = 2,
  Error = 3,
  Canceled = 4,
}

export interface AsyncStoreState<T> {
  data?: T;
  status: AsyncActionStatus;
}

export interface Question {
  questionId: number;
  question: string;
}

export interface Result {
  ei: number;
  jp: number;
  resultId: number;
  sn: 1;
  summary: string;
  tf: number;
  user: string;
}

export interface Answer {
  questionId: number;
  answer: number;
}

export interface AnswersData {
  [questionId: string]: Answer;
}

export interface Store {
  questions: AsyncStoreState<Question[]>;
  result: AsyncStoreState<Result | null>;
  answers: AsyncActionStatus;
}

export const InitialState = {
  questions: {
    data: [],
    status: AsyncActionStatus.Unknown,
  },
  result: {
    data: null,
    status: AsyncActionStatus.Unknown,
  },
  answers: AsyncActionStatus.Unknown,
} as Store;
