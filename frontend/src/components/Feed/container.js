import React, { Component } from "react";
import PropTypes from "prop-types";
import Feed from "./presenter";

class Container extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    const { getFeed } = this.props;
    if (!this.props.feed) {
      getFeed();
    } else {
      //persistence : loading을 false로 하지 않으면 새로고침 시, 계속 로딩이미지 뜸
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.feed) {
      this.setState({
        loading: false,
        feed: nextProps.feed
      });
    }
  };
  render() {
    const { feed } = this.props;
    return <Feed {...this.state} feed={feed} />;
  }
}

Container.propTypes = {
  getFeed: PropTypes.func.isRequired,
  feed: PropTypes.array
};

export default Container;
