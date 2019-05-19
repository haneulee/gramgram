import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/users";

const mapDispatchProps = (dispatch, ownProps) => {
  return {
    facebookLogin: access_token => {
      dispatch(userActions.facebookLogin(access_token));
    },
    createAccount: (username, email, name, password) => {
      dispatch(userActions.createAccount(username, email, name, password));
    }
  };
};

export default connect(
  null,
  mapDispatchProps
)(Container);
