import {
  LOCATION_CHANGED,
  routerForBrowser,
  GO_BACK,
  goBack
} from "redux-little-router";
import {
  Dispatch,
  Middleware,
  MiddlewareAPI,
  Reducer,
  combineReducers
} from "redux";
import { Action, State } from "./App";

export enum RoutesPath {
  login = "/login"
}

const routes = {
  [RoutesPath.login]: {
    title: "login"
  }
};

export const routesMiddleware: Middleware<State, State, Dispatch<Action>> = (
  store: MiddlewareAPI<Dispatch<Action>>
): ((next: Dispatch<Action>) => (action: Action) => Action) => (
  next: Dispatch<Action>
): ((action: Action) => Action) => (action: Action): Action => {
  switch (action.type) {
    case LOCATION_CHANGED: {
      const { result } = action.payload;
      if (result && result.title) {
        document.title = result.title;
      }
      break;
    }
    default:
      break;
  }

  return next(action);
};

export const { reducer, enhancer, middleware } = routerForBrowser({ routes });
