import React from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";
import TimeStamp from "components/TimeStamp";

const NotificationDisplay = (props, context) => {
  const { notification, handleClick, following } = props;
  switch (notification.notification_type) {
    case "comment":
      return (
        <div className={styles.notification}>
          <img
            className={styles.profileImage}
            src={
              notification.creator.profile_image == null
                ? require("images/noPhoto.jpg")
                : notification.creator.profile_image
            }
            alt="profile_image"
          />
          <p className={styles.twoLine}>
            <span className={styles.username}>
              {notification.creator.username}{" "}
            </span>
            {context.t("님이 댓글을 남겼습니다: ")} {notification.comment}{" "}
            <span className={styles.naturalTime}>
              <TimeStamp time={notification.natural_time} />
            </span>
          </p>
          <div>
            <img
              className={styles.image}
              src={notification.image.file}
              alt="profile_image"
            />
          </div>
        </div>
      );
    case "like":
      return (
        <div className={styles.notification}>
          <div>
            <img
              className={styles.profileImage}
              src={
                notification.creator.profile_image == null
                  ? require("images/noPhoto.jpg")
                  : notification.creator.profile_image
              }
              alt="profile_image"
            />
          </div>
          <p className={styles.paragraph}>
            <span className={styles.username}>
              {notification.creator.username}
            </span>{" "}
            {context.t("님이 회원님의 사진을 좋아합니다. ")}
            <span className={styles.naturalTime}>
              <TimeStamp time={notification.natural_time} />
            </span>
          </p>
          <div>
            <img
              className={styles.image}
              src={notification.image.file}
              alt="profile_image"
            />
          </div>
        </div>
      );
    case "follow":
      return (
        <div className={styles.notification}>
          <div>
            <img
              className={styles.profileImage}
              src={
                notification.creator.profile_image == null
                  ? require("images/noPhoto.jpg")
                  : notification.creator.profile_image
              }
              alt="profile_image"
            />
          </div>
          <p className={styles.paragraph}>
            <span className={styles.username}>
              {notification.creator.username}{" "}
            </span>
            {context.t("님이 회원님을 팔로우하기 시작했습니다. ")}
            <span className={styles.naturalTime}>
              <TimeStamp time={notification.natural_time} />
            </span>
          </p>
          <div className={styles.follow} onClick={handleClick}>
            {following ? context.t("Unfollow") : context.t("Follow")}
          </div>
        </div>
      );
    default:
      return <div>default</div>;
  }
};

NotificationDisplay.contextTypes = {
  t: PropTypes.func.isRequired
};

NotificationDisplay.propTypes = {
  notification: PropTypes.objectOf(
    PropTypes.shape({
      comment: PropTypes.string,
      created_at: PropTypes.string,
      creator: PropTypes.shape({
        following: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        profile_image: PropTypes.string,
        usersname: PropTypes.string.isRequired
      }),
      id: PropTypes.number.isRequired,
      image: PropTypes.shape({
        file: PropTypes.string
      }),
      natural_time: PropTypes.string,
      notification_type: PropTypes.func,
      to: PropTypes.number,
      updated_at: PropTypes.string
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  following: PropTypes.bool
};

export default NotificationDisplay;
