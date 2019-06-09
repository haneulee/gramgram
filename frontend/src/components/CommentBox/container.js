import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentBox from "./presenter";

class Container extends Component {
  state = {
    comment: ""
  };
  static propTypes = {
    photoId: PropTypes.number.isRequired,
    submitComment: PropTypes.func.isRequired
  };
  render() {
    return (
      <CommentBox
        handleInputChange={this._handleInputChange}
        handleKeyPress={this._handleKeyPress}
        handleSubmit={this._handleSubmit}
        {...this.state}
        {...this.props}
      />
    );
  }
  _handleSubmit = event => {
    console.log(event);
  };
  _handleInputChange = event => {
    const {
      target: { value }
    } = event;

    this.setState({ comment: value });
  };
  _handleKeyPress = event => {
    const { key } = event;
    const { submitComment } = this.props;
    const { comment } = this.state;

    if (key === "Enter") {
      event.preventDefault();
      submitComment(comment);
      this.setState({
        comment: ""
      });
    }
  };
}

export default Container;
