import React, { Component } from "react";
import { SignupForm } from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    email: ""
  };
  static propTypes = {
    facebookLogin: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired
  };
  render() {
    const { username, password, email, name } = this.state;
    return (
      <SignupForm
        usernameValue={username}
        nameValue={name}
        emailValue={email}
        passwordValue={password}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
        handleFacebookLogin={this._handleFacebookLogin}
      />
    );
  }
  _handleInputChange = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    });
  };
  _handleSubmit = event => {
    const { createAccount } = this.props;
    const { username, email, name, password } = this.state;
    event.preventDefault();
    createAccount(username, email, name, password);
  };
  _handleFacebookLogin = response => {
    const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  };
}

export default Container;
