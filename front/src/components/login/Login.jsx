import mc from "./login.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
/*====components====*/
import SignUp from "./sign-up/SignUp";
import SignIn from "./sign-in/SignIn";
/*====components====*/

const Login = () => {
  const { modificator } = useSelector((store) => {
    return { modificator: store.modificatorsReducer };
  });

  return (
    <div
      className={
        modificator.loginView ? mc.container : `${mc.container} ${mc.hide}`
      }
    >
      {modificator.switchSignInSignUp ? <SignUp /> : <SignIn />}
    </div>
  );
};

export default Login;
