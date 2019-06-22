// imports

// actions

const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT";
const SET_USER_LIST = "SET_USER_LIST";
const SET_IMAGE_LIST = "SET_IMAGE_LIST";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_EXPLORE = "SET_EXPLORE";
const SET_USERNAME = "SET_USERNAME";
const SET_USER_PROFILE = "SET_USER_PROFILE";

// action creators

function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

function logout() {
  return {
    type: LOGOUT
  };
}

function setUserList(userList) {
  return {
    type: SET_USER_LIST,
    userList
  };
}

function setImageList(imageList) {
  return {
    type: SET_IMAGE_LIST,
    imageList
  };
}

function setFollowUser(userId) {
  return {
    type: FOLLOW_USER,
    userId
  };
}

function setUnfollowUser(userId) {
  return {
    type: UNFOLLOW_USER,
    userId
  };
}

function setExplore(userList) {
  return {
    type: SET_EXPLORE,
    userList
  };
}

function setUsername(username) {
  return {
    type: SET_USERNAME,
    username
  };
}

function setUserProfile(userProfile) {
  return {
    type: SET_USER_PROFILE,
    userProfile
  };
}

// API actions

function facebookLogin(access_token) {
  return function(dispatch) {
    fetch("/users/login/facebook/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
          dispatch(setUsername(json.username));
        }
      })
      .catch(err => console.log(err));
  };
}

function usernameLogin(username, password) {
  return function(dispatch) {
    fetch("/rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
          dispatch(setUsername(username));
        }
      })
      .catch(err => console.log(err));
  };
}

function createAccount(username, email, name, password) {
  return function(dispatch) {
    fetch("/rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password1: password,
        password2: password,
        name,
        email
      })
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
        dispatch(setUsername(username));
      })
      .catch(err => console.log(err));
  };
}

function getPhotoLikes(photoId) {
  return (dispatch, getState) => {
    const {
      users: { token }
    } = getState();
    fetch(`/images/${photoId}/likes/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setUserList(json));
      });
  };
}

function followUser(userId) {
  return (dispatch, getState) => {
    dispatch(setFollowUser(userId));
    const {
      users: { token }
    } = getState();
    fetch(`/users/${userId}/follow/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setUnfollowUser(userId));
      }
    });
  };
}

function unfollowUser(userId) {
  return (dispatch, getState) => {
    dispatch(setUnfollowUser(userId));
    const {
      users: { token }
    } = getState();
    fetch(`/users/${userId}/unfollow/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setFollowUser(userId));
      }
    });
  };
}

function getExplore() {
  return (dispatch, getState) => {
    const {
      users: { token }
    } = getState();
    fetch(`/users/explore/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => {
        return dispatch(setExplore(json));
      });
  };
}

function searchByTerm(searchTerm) {
  return async (dispatch, getState) => {
    const {
      users: { token }
    } = getState();
    const userList = await searchUsers(token, searchTerm);
    const imageList = await searchImages(token, searchTerm);

    if (userList === 401 || imageList === 401) {
      dispatch(logout());
    }
    dispatch(setUserList(userList));
    dispatch(setImageList(imageList));
  };
}

function searchUsers(token, searchTerm) {
  return fetch(`/users/search/?username=${searchTerm}`, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.status === 401) {
        return 401;
      }
      return response.json();
    })
    .then(json => json);
}

function searchImages(token, searchTerm) {
  return fetch(`/images/search/?hashtags=${searchTerm}`, {
    headers: {
      Authorization: `JWT ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.status === 401) {
        return 401;
      }
      return response.json();
    })
    .then(json => json);
}

function getUserProfile() {
  return (dispatch, getState) => {
    const {
      users: { token, username }
    } = getState();
    if (username) {
      fetch(`/users/${username}`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${token}`
        }
      })
        .then(response => {
          if (response.status === 401) {
            dispatch(logout());
          }
          return response.json();
        })
        .then(json => {
          console.log(json);
          dispatch(setUserProfile(json));
        });
    }
  };
}

// initial state

const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt"),
  username: localStorage.getItem("username")
};

// reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    case SET_USER_LIST:
      return applySetUserList(state, action);
    case FOLLOW_USER:
      return applyFollowUser(state, action);
    case UNFOLLOW_USER:
      return applyUnfollowUser(state, action);
    case SET_EXPLORE:
      return applySetExplore(state, action);
    case SET_IMAGE_LIST:
      return applySetImageList(state, action);
    case SET_USERNAME:
      return applySetUsername(state, action);
    case SET_USER_PROFILE:
      return applySetUserProfile(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetToken(state, action) {
  const { token } = action;
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn: true,
    token: token
  };
}

function applyLogout(state, action) {
  localStorage.removeItem("jwt");
  return {
    isLoggedIn: false
  };
}

function applySetUserList(state, action) {
  const { userList } = action;
  return {
    ...state,
    userList
  };
}

function applySetImageList(state, action) {
  const { imageList } = action;
  return {
    ...state,
    imageList
  };
}

function applyFollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;

  const updatedUser = userList.map(user => {
    if (userId === user.id) {
      return { ...user, following: true };
    }
    return user;
  });

  return { ...state, userList: updatedUser };
}

function applyUnfollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;

  const updatedUser = userList.map(user => {
    if (userId === user.id) {
      return { ...user, following: false };
    }
    return user;
  });

  return { ...state, userList: updatedUser };
}

function applySetExplore(state, action) {
  const { userList } = action;
  return {
    ...state,
    userList
  };
}

function applySetUsername(state, action) {
  const { username } = action;
  localStorage.setItem("username", username);
  return {
    ...state,
    username
  };
}

function applySetUserProfile(state, action) {
  const { userProfile } = action;
  return {
    ...state,
    userProfile
  };
}

// exports

const actionCreators = {
  facebookLogin,
  usernameLogin,
  createAccount,
  logout,
  getPhotoLikes,
  followUser,
  unfollowUser,
  getExplore,
  searchByTerm,
  setUsername,
  getUserProfile
};

export { actionCreators };

// export reducer by default

export default reducer;
