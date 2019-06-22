import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  static propTypes = {
    getUserProfile: PropTypes.func.isRequired
  };
  componentDidMount() {
    const { getUserProfile } = this.props;
    if (!this.props.userProfile) {
      getUserProfile();
    } else {
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.userProfile) {
      this.setState({
        loading: false,
        userProfile: nextProps.userProfile
      });
    }
  };

  render() {
    return <Profile {...this.state} {...this.props} />;
  }
}

export default Container;
