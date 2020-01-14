import createBrowserHistory from "history/createBrowserHistory";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { Cookies } from "react-cookie";

import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  initializeCurrentLocation,
  State as RouterState
} from "redux-little-router";
import {
  combineEpics,
  createEpicMiddleware,
  Epic,
  EpicMiddleware
} from "redux-observable";

import { Fragment, RouterActions } from "redux-little-router";
import {
  enhancer,
  middleware,
  reducer as router,
  routesMiddleware
} from "./router";

import { AuthDataProvider } from "../../api/AuthDataProvider";
import { host } from "../../common/constants";
import { AuthAction } from "../Auth/actions";
import { AuthContainer } from "../Auth/AuthContainer";
import { authEpics } from "../Auth/epics";
import { auth } from "../Auth/reducers";
import { AuthState } from "../Auth/typings";

export type Action = AuthAction | RouterActions;
// smirnovvad7@gmail.com
export interface EpicDeps {
  authDataProvider: AuthDataProvider;
}
export interface State extends RouterState {
  auth: AuthState;
}

export type FuncEpic = Epic<Action, Action, State, EpicDeps>;

const createMiddleware = (
  epicMiddleware: EpicMiddleware<Action, Action, State, EpicDeps>
) => applyMiddleware(middleware, epicMiddleware, routesMiddleware);
export const Cookie = new Cookies();

export const App: React.FC = () => {
  const history = createBrowserHistory();
  const composeEnhancers = composeWithDevTools({ serialize: true });
  const epicMiddleware = createEpicMiddleware<Action, Action, State, EpicDeps>({
    dependencies: {
      authDataProvider: new AuthDataProvider(host)
    }
  });

  const store = createStore<State, Action, {}, {}>(
    combineReducers({ router, auth }),
    composeEnhancers(enhancer, createMiddleware(epicMiddleware))
  );

  epicMiddleware.run(combineEpics(authEpics));

  const initialState = store.getState();

  if (initialState && initialState.router) {
    store.dispatch(initializeCurrentLocation(initialState.router));
  }
  return (
    <Provider store={store}>
      <AuthContainer />
    </Provider>
  );
};
