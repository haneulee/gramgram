import React, { Component } from "react";
import PropTypes from "prop-types";
import Explore from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    const { getExplore } = this.props;
    if (!this.props.userList) {
      getExplore();
    } else {
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.userList) {
      this.setState({
        loading: false,
        userList: nextProps.userList
      });
    }
  };
  render() {
    const { userList } = this.props;
    return <Explore {...this.state} userList={userList} />;
  }
}

Container.propTypes = {
  getExplore: PropTypes.func.isRequired,
  userList: PropTypes.array
};

export default Container;
