import React from "react";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import { IoIosSettings } from "react-icons/io";
import PhotoDisplay from "components/PhotoDisplay";
import styles from "./styles.module.scss";

const Profile = (props, context) => {
  console.log(props);
  if (props.loading) {
    return <LoadingProfile />;
  } else if (props.userProfile) {
    return <RenderProfile {...props} />;
  }
};

const LoadingProfile = props => (
  <div className={styles.container}>
    <Loading />
  </div>
);

const RenderProfile = props => (
  <div className={styles.container}>
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <img src={props.userProfile.profile_image} />
      </div>
      <div className={styles.profileBox}>
        <div className={styles.username}>
          {props.userProfile.username}
          <IoIosSettings
            className={styles.setting}
            onClick={props.logout}
            fontSize="20px"
            color="black"
          />{" "}
        </div>

        <div className={styles.numbers}>
          <div className={styles.post}>
            {`게시물 `}
            <span>{props.userProfile.post_count}</span>
          </div>
          <div className={styles.follower}>
            {`팔로워 `}
            <span>{props.userProfile.followers_count}</span>
          </div>
          <div className={styles.following}>
            {`팔로우 `}
            <span>{props.userProfile.following_count}</span>
          </div>
        </div>

        <div className={styles.name}>{props.userProfile.name} </div>
        <div className={styles.bio}>{props.userProfile.bio} </div>
        <div className={styles.website}>{props.userProfile.website} </div>
      </div>
    </div>
    <div className={styles.tab}>
      <div>{`게시물`}</div>
      <div>{`IGTV`}</div>
      <div>{`저장됨`}</div>
      <div>{`태그됨`}</div>
    </div>
    <div className={styles.images}>
      {<RenderImages images={props.userProfile.images} />}
    </div>
  </div>
);

const RenderImages = props => (
  <div className={styles.container}>
    {props.images.map(img => (
      <PhotoDisplay photo={img} key={img.id} />
    ))}
  </div>
);

Profile.contextTypes = {
  t: PropTypes.func.isRequired
};

Profile.propTypes = {
  loading: PropTypes.bool.isRequired,
  userProfile: PropTypes.object,
  logout: PropTypes.func.isRequired
};

export default Profile;
