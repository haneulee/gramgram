// imports

import { actionCreators as userActions } from "redux/modules/users";

// actions

const SET_FEED = "SET_FEED";
const LIKE_PHOTO = "LIKE_PHOTO";
const DISLIKE_PHOTO = "DISLIKE_PHOTO";

// action creators

function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
  };
}

function doLikePhoto(photoId) {
  return {
    type: LIKE_PHOTO,
    photoId
  };
}

function doDislikePhoto(photoId) {
  return {
    type: DISLIKE_PHOTO,
    photoId
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

function likePhoto(photoId) {
  return function(dispatch, getState) {
    dispatch(doLikePhoto(photoId));
    const {
      users: { token }
    } = getState();
    fetch(`/images/${photoId}/likes/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doDislikePhoto(photoId));
      }
    });
  };
}

function dislikePhoto(photoId) {
  return function(dispatch, getState) {
    dispatch(doDislikePhoto(photoId));
    const {
      users: { token }
    } = getState();
    fetch(`/images/${photoId}/unlikes/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logout());
      } else if (!response.ok) {
        dispatch(doLikePhoto(photoId));
      }
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
    case LIKE_PHOTO:
      return applyLikePhoto(state, action);
    case DISLIKE_PHOTO:
      return applyDislikePhoto(state, action);
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

function applyLikePhoto(state, action) {
  const { photoId } = action;
  const { feed } = state;

  const updatedFeed = feed.map(photo => {
    if (photo.id === photoId) {
      return { ...photo, is_liked: true, like_count: photo.like_count + 1 };
    }

    return photo;
  });

  return { ...state, feed: updatedFeed };
}

function applyDislikePhoto(state, action) {
  const { photoId } = action;
  const { feed } = state;

  const updatedFeed = feed.map(photo => {
    if (photo.id === photoId) {
      return { ...photo, is_liked: false, like_count: photo.like_count - 1 };
    }

    return photo;
  });

  return { ...state, feed: updatedFeed };
}

// exports

const actionCreators = {
  getFeed,
  setFeed,
  likePhoto,
  dislikePhoto
};

export { actionCreators };

// export reducer by default

export default reducer;