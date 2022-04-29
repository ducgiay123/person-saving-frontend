import React from "react";
import "./loginPage.css";
import ListItem from "./ListItem";
import icon from "../assert/test.png";
const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="colorContainer"></div>
      <div className="loginContainer">
        <div className="leftDiv">
          <img src={icon} href="" />
        </div>
        <div className="rightDiv">
          <div className="loginForm">
            <h1>Money calculation table</h1>
            <ListItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
