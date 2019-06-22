import React from "react";
import { FiUser, FiHeart, FiCompass } from "react-icons/fi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import Notification from "components/Notification";

const Navigation = (props, context) => (
  <div className={styles.navigation}>
    <div className={styles.inner}>
      <div className={styles.column}>
        <Link to="/">
          <img
            src={require("images/logo.png")}
            className={styles.logo}
            alt={context.t("Logo")}
          />
        </Link>
      </div>
      <div className={styles.column}>
        <form onSubmit={props.onSubmit}>
          <input
            type="text"
            placeholder={context.t("Search")}
            className={styles.searchInput}
            value={props.value}
            onChange={props.onInputChange}
          />
        </form>
      </div>
      <div className={styles.column}>
        <div className={styles.navIcon}>
          <Link to="/explore">
            <FiCompass fontSize="28px" color="black" />
          </Link>
        </div>
        <div className={styles.navIcon}>
          <FiHeart
            fontSize="28px"
            color="black"
            onClick={props.handleNotification}
          />
          {props.notification ? <Notification /> : null}
        </div>
        <div className={styles.navIcon}>
          <Link to="/profile">
            <FiUser fontSize="32px" color="black" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

Navigation.contextTypes = {
  t: PropTypes.func.isRequired
};

Navigation.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  notification: PropTypes.bool.isRequired,
  handleNotification: PropTypes.func.isRequired
};

export default Navigation;
