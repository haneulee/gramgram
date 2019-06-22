import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    users: { notificationList }
  } = state;
  return {
    notificationList
  };
};

export default connect(
  mapStateToProps,
  null
)(Container);
