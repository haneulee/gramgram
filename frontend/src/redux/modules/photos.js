// imports

import { actionCreators as userActions } from "redux/modules/users";

// actions

// action creators

// API actions

function getFeed() {
  return function(dispatch, getState) {
    const {
      users: { token }
    } = getState();
    fetch("/images/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(userActions.logout());
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        // if (json.token) {
        //   dispatch(saveToken(json.token));
        // }
      })
      .catch(err => console.log(err));
  };
}

// initial state

const initialState = {};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// reducer functions

// exports

const actionCreators = {
  getFeed
};

export { actionCreators };

// export reducer by default

export default reducer;
