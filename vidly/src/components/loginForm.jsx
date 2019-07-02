import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login, getCurrentUser } from "../services/authService";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {} // reusable
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      await login(this.state.data.username, this.state.data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        console.log(ex.response.data);
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="m-2 container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
