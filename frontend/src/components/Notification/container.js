import React, { Component } from "react";
import Notification from "./presenter";
import { actionCreators as userActions } from "redux/modules/users";

class Container extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getExplore());
  }

  render() {
    return <Notification {...this.props} />;
  }
}

export default Container;
