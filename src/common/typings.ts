export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function
    ? K
    : T[K] extends Function | undefined
    ? K
    : never;
}[keyof T];

export type TStateProps<T, TOwnProps = {}> = Pick<
  T,
  Exclude<NonFunctionPropertyNames<T>, NonFunctionPropertyNames<TOwnProps>>
>;
export type TDispatchProps<T, TOwnProps = {}> = Pick<
  T,
  Exclude<FunctionPropertyNames<T>, FunctionPropertyNames<TOwnProps>>
>;

export enum PageStatus {
  LOADING = "LOADING",
  LOADED = "LOADED",
  ERROR = "ERROR"
}
