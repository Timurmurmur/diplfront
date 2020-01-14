import { Action } from "../App/App";
import { AuthState } from "./typings";
import { PageStatus } from "../../common/typings";
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from "./actions";

const defaultAuthState = { pageStatus: PageStatus.LOADED };

export const auth = (state: AuthState = defaultAuthState, action: Action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        pageStatus: PageStatus.LOADING
      };
    case LOGIN_ERROR:
      return {
        ...state,
        pageStatus: PageStatus.ERROR
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        pageStatus: PageStatus.LOADED
      };
    default:
      return state;
  }
};
