import React from "react";
import PropTypes from "prop-types";
import { FaHeart, FaRegHeart, FaRegComment } from "react-icons/fa";
import styles from "./styles.module.scss";

const PhotoActions = (props, context) => {
  return (
    <div className={styles.actions}>
      <div className={styles.icons}>
        <span className={styles.icon} onClick={props.handleHeartClick}>
          {props.isLiked ? (
            <FaHeart fontSize="28px" color="#EB4B59" />
          ) : (
            <FaRegHeart fontSize="28px" color="black" />
          )}
        </span>
        <span className={styles.icon}>
          <FaRegComment fontSize="28px" />
        </span>
      </div>
      <span className={styles.likes} onClick={props.openLikes}>
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
  number: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  photoId: PropTypes.number.isRequired,
  handleHeartClick: PropTypes.func.isRequired,
  openLikes: PropTypes.func.isRequired
};

export default PhotoActions;
