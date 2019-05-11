import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const { users } = state;
  return {
    isLoggedIn: users.isLoggedIn
  };
};

export default connect(mapStateToProps)(Container);
