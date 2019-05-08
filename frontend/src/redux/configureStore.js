import { combineReducers, createStore, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import users from "redux/modules/users";
import { composeWithDevTools } from "redux-devtools-extension";
import { i18nState } from "redux-i18n";

const env = process.env.NODE_ENV;

const history = createBrowserHistory();

const middlewares = [thunk, routerMiddleware(history)];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  users,
  router: connectRouter(history),
  i18nState
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
        routerMiddleware(history), // for dispatching history actions
        ...middlewares
        // ... other middlewares ...
      )
    )
  );

  return store;
}

export default configureStore();
