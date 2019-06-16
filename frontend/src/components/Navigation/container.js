import React, { Component } from "react";
import PropTypes from "prop-types";
import Navigation from "./presenter";

class Container extends Component {
  state = {
    term: ""
  };
  static propTypes = {
    goToSearch: PropTypes.func.isRequired
  };
  render() {
    return (
      <Navigation
        value={this.state.term}
        onInputChange={this._onInputChange}
        onSubmit={this._onSubmit}
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
}

export default Container;
