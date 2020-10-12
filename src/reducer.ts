import { Actions } from "./actions";
import { Reducer } from "redux";
import { AsyncActionStatus, Store, InitialState } from "./types";

const reducer: Reducer<Store> = (
  state: Store = InitialState,
  action: Actions
): Store => {
  switch (action.type) {
    case "result/fetch":
      return {
        ...state,
        result: { status: AsyncActionStatus.Loading },
      };
    case "result/error":
      return {
        ...state,
        result: { status: AsyncActionStatus.Error },
      };
    case "result/update":
      return {
        ...state,
        result: {
          data: action.payload.result,
          status: AsyncActionStatus.Success,
        },
      };
    case "questions/fetch":
      return {
        ...state,
        questions: { status: AsyncActionStatus.Loading },
      };
    case "questions/error":
      return {
        ...state,
        questions: { status: AsyncActionStatus.Error },
      };
    case "questions/update":
      return {
        ...state,
        questions: {
          data: action.payload.questions,
          status: AsyncActionStatus.Success,
        },
      };
    case "answers/post":
      return {
        ...state,
        answers: AsyncActionStatus.Loading,
      };
    case "answers/error":
      return {
        ...state,
        answers: AsyncActionStatus.Error,
      };

    default:
      return state;
  }
};

export default reducer;
