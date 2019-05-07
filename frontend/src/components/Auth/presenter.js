import React from "react";
import styles from "./styles.scss";

const Auth = (props, context) => (
  <main className="auth">
    <div className="column">
      <img
        className="phoneImg"
        src={require("images/phone.png")}
        alt="Checkout our app. Is cool"
      />
    </div>
    <div className="column">
      <div className="whiteBox">
        {(() => {
          switch (props.action) {
            case "login":
              return (
                <p>
                  Don't have an account?{" "}
                  <span className="changeLink" onClick={props.changeAction}>
                    Sign up
                  </span>
                </p>
              );
            case "signup":
              return (
                <p>
                  Have an account?{" "}
                  <span className="changeLink" onClick={props.changeAction}>
                    Log in
                  </span>
                </p>
              );
            default:
              return null;
          }
        })()}
      </div>
      <div className="appBox">
        <span>Get the app</span>
        <div className="appstores">
          <img
            className="downloadImg"
            src={require("images/ios.png")}
            alt="Download it on the Apple Appstore"
          />
          <img
            className="downloadImg"
            src={require("images/android.png")}
            alt="Download it on the Apple Appstore"
          />
        </div>
      </div>
    </div>
  </main>
);

export default Auth;
