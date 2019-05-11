import React, { Component } from "react";
import { SignupForm } from "./presenter";

class Container extends Component {
  state = {
    username: "",
    password: "",
    fullname: "",
    email: ""
  };
  render() {
    const { username, password, email, fullname } = this.state;
    return (
      <SignupForm
        usernameValue={username}
        fullnameValue={fullname}
        emailValue={email}
        passwordValue={password}
        handleInputChange={this._handleInputChange}
        handleSubmit={this._handleSubmit}
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
    event.preventDefault();
  };
}

export default Container;
