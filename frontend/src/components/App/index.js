import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {
    isLoggedin: user && user.isLoggedin
  };
};

export default connect(mapStateToProps)(Container);
