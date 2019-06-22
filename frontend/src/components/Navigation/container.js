import React, { Component } from "react";
import PropTypes from "prop-types";
import Navigation from "./presenter";

class Container extends Component {
  state = {
    term: "",
    notification: false
  };
  static propTypes = {
    goToSearch: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired
  };
  render() {
    return (
      <Navigation
        value={this.state.term}
        onInputChange={this._onInputChange}
        onSubmit={this._onSubmit}
        notification={this.state.notification}
        handleNotification={this._handleNotification}
      />
    );
  }
  _onInputChange = e => {
    const {
      target: { value }
    } = e;
    this.setState({
      term: value
    });
  };
  _onSubmit = e => {
    e.preventDefault();
    this.props.goToSearch(this.state.term);
    this.setState({
      term: ""
    });
  };
  _handleNotification = () => {
    const { notification } = this.state;
    if (notification) {
      this.setState({
        notification: false
      });
    } else {
      this.props.getNotifications();
      this.setState({
        notification: true
      });
    }
  };
}

export default Container;
