import React from "react";
import PropTypes from "prop-types";
import { FaHeart, FaRegComment } from "react-icons/fa";
import styles from "./styles.module.scss";

const PhotoDisplay = props => (
  <div className={styles.container}>
    <img
      src={props.photo.file}
      className={styles.photo}
      alt={props.photo.file}
    />
    <div className={styles.overlay}>
      <span className={styles.data}>
        <FaHeart fontSize="22px" color="white" /> {props.photo.like_count}
      </span>
      <span className={styles.data}>
        <FaRegComment fontSize="22px" color="white" />{" "}
        {props.photo.comment_count}
      </span>
    </div>
  </div>
);

PhotoDisplay.propTypes = {
  photo: PropTypes.shape({
    file: PropTypes.string.isRequired,
    comment_count: PropTypes.number.isRequired,
    like_count: PropTypes.number.isRequired
  }).isRequired
};

export default PhotoDisplay;
