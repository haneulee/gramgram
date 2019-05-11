import React, { Component } from "react";
import { LoginForm } from "./presenter";
import PropTypes from "prop-types";

// const Container = props => <LoginForm {...props} />;

class Container extends Component {
  state = {
    username: "",
    password: ""
  };
  static propTypes = {
    facebookLogin: PropTypes.isRequired
  };
  render() {
    const { username, password } = this.state;
    return (
      <LoginForm
        usernameValue={username}
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
