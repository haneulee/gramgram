import React, { Component } from "react";
import { SignupForm } from "./presenter";
import PropTypes from "prop-types";

class Container extends Component {
  state = {
    username: "",
    password: "",
    fullname: "",
    email: ""
  };
  static propTypes = {
    facebookLogin: PropTypes.func.isRequired
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
    event.preventDefault();
  };
  _handleFacebookLogin = response => {
    console.log(response);
    const { facebookLogin } = this.props;
    facebookLogin(response.accessToken);
  };
}

export default Container;
