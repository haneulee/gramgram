import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/users";

const mapStateToProps = (state, ownProps) => {
  const {
    users: { userList, imageList },
    router: { location }
  } = state;
  return {
    userList,
    imageList,
    location
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { searchTerm }
    }
  } = ownProps;
  return {
    searchByTerm: () => {
      dispatch(userActions.searchByTerm(searchTerm));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
