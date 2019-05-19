import { connect } from "react-redux";
import Container from "./container";

const mapStateToProps = (state, ownProps) => {
  const {
    users,
    router: { location }
  } = state;
  return {
    isLoggedIn: users.isLoggedIn,
    pathname: location.pathname //if pathname is changed, it would do re-render
  };
};

export default connect(mapStateToProps)(Container);
