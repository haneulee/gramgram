import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/users";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getExplore: () => {
      dispatch(userActions.getExplore());
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  const {
    users: { userList }
  } = state;
  return {
    userList
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
