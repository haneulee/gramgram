import { connect } from "react-redux";
import Container from "./container";
import { push } from "react-router-redux";
import { actionCreators as userActions } from "redux/modules/users";

const mapStateToProps = (state, ownProps) => {
  const {
    users: { userProfile }
  } = state;

  return {
    userProfile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserProfile: () => {
      dispatch(userActions.getUserProfile());
    },
    logout: () => {
      dispatch(userActions.logout());
      dispatch(push(`/`));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
