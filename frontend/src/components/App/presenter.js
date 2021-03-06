import React from "react";
import "./styles.module.scss";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import Auth from "components/Auth";
import Navigation from "components/Navigation";
import Footer from "components/Footer";
import Feed from "components/Feed";
import Explore from "components/Explore";
import Search from "components/Search";
import Profile from "components/Profile";

const App = props => [
  props.isLoggedIn ? <Navigation key={1} /> : null,
  props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
  <Footer key={3} />
];

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

const PrivateRoutes = props => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route exact path="/explore" component={Explore} />
    <Route exact path="/search/:searchTerm" component={Search} />
    <Route exact path="/profile" component={Profile} />
  </Switch>
);

const PublicRoutes = props => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/forgot" render={() => "password"} />
  </Switch>
);

export default App;
