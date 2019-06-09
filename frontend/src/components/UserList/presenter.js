import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Loading from "components/Loading";
import { IoMdClose } from "react-icons/io";
import UserRow from "components/UserRow";

const UserList = props => (
  <div className={styles.container}>
    <div className={styles.box}>
      <header className={styles.header}>
        <h4 className={styles.title}>{props.title}</h4>
        <span onClick={props.closeLikes}>
          <IoMdClose fontSize="20px" color="black" />
        </span>
      </header>
      <div className={styles.content}>
        {props.loading ? <Loading /> : <RenderUsers list={props.userList} />}
      </div>
    </div>
  </div>
);

const RenderUsers = props => {
  return props.list.map(user => <UserRow user={user} key={user.id} />);
};

UserList.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  userList: PropTypes.array,
  closeLikes: PropTypes.func.isRequired
};

export default UserList;
