import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Formik } from "formik";
import "./login.css";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {};

  render() {
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {

            console.log('values', values);
            if (!values.username){
                alert('asasas');
                return;
            }

            console.log('Kena eksekusi')
        }}
        // validateForm={(values) => {
        //     console.log('values', values);
        // }}
      >
        {props => {
            console.log('props', props)
          const {
            values: {username, password},
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          } = props;
          return (
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Item>
                <Input
                  value={username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="username"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item>
                <Input
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="password"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Checkbox>Remember me</Checkbox>
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default NormalLoginForm;
