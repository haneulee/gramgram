// imports

import { actionCreators as userActions } from "redux/modules/users";

// actions

const SET_FEED = "SET_FEED";

// action creators

function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
  };
}

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
        // if (json.token) {
        dispatch(setFeed(json));
        // }
      });
  };
}

// initial state

const initialState = {};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return applySetFeed(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetFeed(state, action) {
  const { feed } = action;

  return {
    ...state,
    feed
  };
}

// exports

const actionCreators = {
  getFeed,
  setFeed
};

export { actionCreators };

// export reducer by default

export default reducer;
