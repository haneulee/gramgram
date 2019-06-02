import React from "react";
import PropTypes from "prop-types";
// import styles from "./styles.module.scss";

const PhotoComments = (props, context) => {
  return (
    <div>
      <ul>
        <Comment username={props.creator} comment={props.caption} />
        {props.comments.map(comment => (
          <Comment
            username={comment.creator.username}
            comment={comment.message}
            key={comment.id}
          />
        ))}
      </ul>
    </div>
  );
};

const Comment = props => {
  return (
    <li>
      <span>{props.username}</span>
      <span>{props.comments}</span>
    </li>
  );
};

PhotoComments.propTypes = {
  caption: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      creator: PropTypes.shape({
        profile_image: PropTypes.string,
        image: PropTypes.string
      }).isRequired,
      message: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PhotoComments;
