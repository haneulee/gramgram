import React from "react";
import PropTypes from "prop-types";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import styles from "./styles.module.scss";

const PhotoActions = (props, context) => {
  return (
    <div className={styles.actions}>
      <div className={styles.icons}>
        <span className={styles.icon}>
          <FiHeart fontSize="28px" />
        </span>
        <span className={styles.icon}>
          <FiMessageCircle fontSize="28px" />
        </span>
      </div>
      <span className={styles.likes}>
        {props.number}{" "}
        {props.number === 1 ? context.t("like") : context.t("likes")}
      </span>
    </div>
  );
};

PhotoActions.contextTypes = {
  t: PropTypes.func.isRequired
};

PhotoActions.propTypes = {
  number: PropTypes.number.isRequired
};

export default PhotoActions;
