import React from "react";
import PropTypes from "prop-types";
import LogoFacebook from "react-ionicons/lib/LogoFacebook";
import formStyles from "shared/formStyles.module.scss";

export const LoginForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <form className={formStyles.form}>
      <input
        type="text"
        placeholder={context.t("Username")}
        className={formStyles.textInput}
      />
      <input
        type="password"
        placeholder="Password"
        className={formStyles.textInput}
      />
      <input type="submit" value="Log in" className={formStyles.button} />
    </form>
    <span className={formStyles.divider}>or</span>
    <span className={formStyles.facebookLink}>
      <LogoFacebook fontSize="20px" color="#385185" />{" "}
      {context.t("Log in with Facebook")}
    </span>
    <span className={formStyles.forgotLink}>
      {context.t("Forgot password?")}
    </span>
  </div>
);

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired
};
