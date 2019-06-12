import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    users: { userList }
  } = state;
  return {
    userList
  };
};

export default connect(mapStateToProps)(Container);
