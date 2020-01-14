import { combineEpics, ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { changeLocation } from "../../common/helpers";
import { FuncEpic } from "../App/App";
import { LOGIN, LoginAction, loginError, loginSuccess } from "./actions";

const loginEpic: FuncEpic = (action$, store$, deps) => {
  return action$.pipe(
    ofType(LOGIN),
    switchMap(({ email, password }: LoginAction) => {
      return from(deps.authDataProvider.login(email, password)).pipe(
        switchMap(() => {
          return of(loginSuccess(), changeLocation("/", false));
        }),
        catchError(e => {
          return of(loginError(e.message));
        })
      );
    })
  );
};

export const authEpics = combineEpics(loginEpic);
