import { connect } from "react-redux";
import { Auth, AuthProps } from "./Auth";
import { TDispatchProps, TStateProps } from "../../common/typings";
import { login } from "./actions";
import { Dispatch } from "redux";
import { Action, State } from "../App/App";
import { Form } from "antd";

interface OwnProps {}

type StateProps = TStateProps<AuthProps, OwnProps>;
type DispatchProps = TDispatchProps<AuthProps, OwnProps>;

const mapStateToProps = (state: State): StateProps => ({
  pageStatus: state.auth.pageStatus
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  login: (email: string, password: string) => {
    dispatch(login(email, password));
  }
});

export const AuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create({ name: "normal_login" })(Auth));
