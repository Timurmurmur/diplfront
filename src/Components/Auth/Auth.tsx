import React, { useCallback, useState, useEffect } from "react";
import { PageStatus } from "../../common/typings";
import "./Auth.css";
import { Form, Tooltip, Input, Icon, Checkbox, Button } from "antd";

export interface AuthProps {
  pageStatus: PageStatus;

  login: (email: string, password: string) => void;
  form?: any;
}

export const Auth: React.FC<AuthProps> = (props: any) => {
  console.log(props);
  const { getFieldDecorator, validateFields } = props.form;
  const { login, pageStatus } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChangeCallback = useCallback(
    (e: any) => {
      if (e.target) {
        setEmail(e.target.value);
      }
    },
    [email]
  );

  const handlePasswordChangeCallback = useCallback(
    (e: any) => {
      if (e.target) {
        setPassword(e.target.value);
      }
    },
    [password]
  );

  const loginCallback = useCallback(
    e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          login(email, password);
        }
      });
    },
    [email, password, login]
  );

  return (
    <div className="container container_comp_auth">
      <Form className="login-form">
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              { required: true, message: "Please input your e-mail" }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="E-Mail"
              onChange={handleEmailChangeCallback}
              suffix={
                <Tooltip title="Enter your E-Mail">
                  <Icon
                    type="info-circle"
                    style={{ color: "rgba(0,0,0,.45)" }}
                  />
                </Tooltip>
              }
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              onChange={handlePasswordChangeCallback}
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: false
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={loginCallback}
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
