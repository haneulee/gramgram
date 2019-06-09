import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import PhotoActions from "components/PhotoActions";
import PhotoComments from "../PhotoComments";
import TimeStamp from "../TimeStamp";
import CommentBox from "../CommentBox";
import UserList from "../UserList";

const FeedPhoto = (props, context) => {
  return (
    <div className={styles.feedPhoto}>
      <header className={styles.header}>
        <img
          src={props.creator.profile_image || require("images/noPhoto.jpg")}
          alt={props.creator.username}
          className={styles.image}
        />
        <div className={styles.headerColumn}>
          <span className={styles.creator}>{props.creator.username}</span>
          <span className={styles.location}>{props.location}</span>
        </div>
      </header>
      <img src={props.file} alt={props.caption} />
      <div className={styles.meta}>
        <PhotoActions
          number={props.like_count}
          isLiked={props.is_liked}
          photoId={props.id}
          openLikes={props.openLikes}
        />
        <PhotoComments
          caption={props.caption}
          creator={props.creator.username}
          comments={props.comments}
        />
        <TimeStamp time={props.natural_time} />
        <CommentBox photoId={props.id} />
      </div>
      {props.seeingLikes && (
        <UserList title={context.t("Likes")} closeLikes={props.closeLikes} />
      )}
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
  ).isRequired,
  is_liked: PropTypes.bool.isRequired,
  seeingLikes: PropTypes.bool.isRequired,
  openLikes: PropTypes.func.isRequired,
  closeLikes: PropTypes.func.isRequired
};

FeedPhoto.contextTypes = {
  t: PropTypes.func.isRequired
};

export default FeedPhoto;
