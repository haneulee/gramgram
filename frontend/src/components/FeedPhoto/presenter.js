import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import PhotoActions from "components/PhotoActions";
import PhotoComments from "../PhotoComments";
import TimeStamp from "../TimeStamp";
import CommentBox from "../CommentBox";

const FeedPhoto = (props, context) => {
  return (
    <div className={styles.feedPhoto}>
      <header>
        <img
          src={props.creator.profile_image || require("images/noPhoto.jpg")}
          alt={props.creator.username}
        />
        <div>
          <span id={props.creator.username} />
          <span id={props.location} />
        </div>
        <img src={props.file} alt={props.caption} />
        <div>
          <PhotoActions number={props.like_count + 1} />
          <PhotoComments
            caption={props.caption}
            creator={props.creator.username}
            comments={props.comments}
          />
          <TimeStamp time={props.natural_time} />
          <CommentBox />
        </div>
      </header>
    </div>
  );
};

FeedPhoto.propTypes = {
  caption: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  like_count: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  natural_time: PropTypes.string,
  creator: PropTypes.shape({
    profile_image: PropTypes.string,
    image: PropTypes.string
  }),
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

export default FeedPhoto;
