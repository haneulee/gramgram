import React from "react";
import PropTypes from "prop-types";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
// import styles from "./styles.module.scss";

const PhotoActions = (props, context) => {
  return (
    <div>
      <div>
        <span>
          <FiHeart fontSize="28px" />
        </span>
        <span>
          <FiMessageCircle fontSize="28px" />
        </span>
      </div>
      <span>
        {props.number}{" "}
        {props.number > 1 ? context.t("likes") : context.t("like")}
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
