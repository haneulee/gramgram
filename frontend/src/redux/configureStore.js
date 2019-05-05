import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import users from "redux/modules/users";
import { composeWithDevTools } from "redux-devtools-extension";

const env = process.env.NODE_ENV;

const history = createBrowserHistory();

const middlewares = [thunk, routerMiddleware(history)];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  users,
  router: connectRouter(history)
});

// let store = initialState =>
//   createStore(reducer, applyMiddleware(...middlewares));

export { history };

function configureStore(preloadedState) {
  const store = createStore(
    reducer, //createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history) // for dispatching history actions
        // ... other middlewares ...
      )
    )
  );

  return store;
}

export default configureStore();
