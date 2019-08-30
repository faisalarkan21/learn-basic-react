import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import "./login.css";
import { postLogin } from "../actions/auth";

class NormalLoginForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {
      login: { data }
      
    } = nextProps;

    

    // console.lologing('nextProps', nextProps)

    if (data.isValid) {
      this.props.history.push("/");
    } else {
      alert("Salah password kak !");
    }

    // console.log('nextProps' , nextProps);
  }

  render() {
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          this.props.dispatch(postLogin(values));
        }}
        validate={values => {
          console.log("values222", values);
          const errors = {};
          if (!values.username) {
            errors.username = "Fill in login username";
          }
          if (!values.password) {
            errors.password = "Fill in login password";
          }
          return errors;
        }}
      >
        {props => {
          console.log("props", props);
          const {
            values: { username, password },
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
                {errors.username && touched.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
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
                {errors.password && touched.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
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
                Or <Link to="register">register now!</Link>
              </Form.Item>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    countingAdd: state.countingAdd,
    login: state.loginUser
  };
}

export default withRouter(connect(mapStateToProps)(NormalLoginForm));
