import React from "react";
import PropTypes from "prop-types";
import LogoFacebook from "react-ionicons/lib/LogoFacebook";
import styles from "./styles.module.scss";

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export const LoginForm = (props, context) => (
  <div className={styles.formComponent}>
    <form className={styles.form}>
      <input
        type="text"
        placeholder={context.t("Username")}
        className={styles.textInput}
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.textInput}
      />
      <input type="submit" value="Log in" className={styles.button} />
    </form>
    <span className={styles.divider}>or</span>
    <span className={styles.facebookLink}>
      <LogoFacebook fontSize="20px" color="#385185" />{" "}
      {context.t("Log in with Facebook")}
    </span>
    <span className={styles.forgotLink}>{context.t("Forgot password?")}</span>
  </div>
);

export const SignupForm = props => (
  <div className={styles.formComponent}>
    <h3 className={styles.signupHeader}>
      {context.t("Sign up to see photos and videos from your friends.")}
    </h3>
    <button className={styles.button}>
      <LogoFacebook fontSize="20px" color="white" />
      {context.t("Log in with Facebook")}
    </button>
    <span className={styles.divider}>or</span>
    <form className={styles.form}>
      <input type="email" placeholder="Email" className={styles.textInput} />
      <input type="text" placeholder="Full Name" className={styles.textInput} />
      <input
        type="username"
        placeholder="Username"
        className={styles.textInput}
      />
      <input
        type="password"
        placeholder="Password"
        className={styles.textInput}
      />
      <input type="submit" value="Sign up" className={styles.button} />
    </form>
    <p className={styles.terms}>
      {context.t("By signing up, you agree to our")}{" "}
      <span>{context.t("Terms & Privacy Policy")}</span>
    </p>
  </div>
);
