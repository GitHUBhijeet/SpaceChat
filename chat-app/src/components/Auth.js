import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Auth = (props) => {
  const signInwithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      props.setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth container">
      <h1>SpaceChat</h1>
      <p className="sign-in-text">Sign in with Google to continue...</p>
      <div className="btn-div">
        <button className="sign-in-btn" onClick={signInwithGoogle}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Auth;
