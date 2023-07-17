import React, { useState } from "react";
import { ReactComponent as MySVG } from "../Assets/newlogo 1.svg";
import { OldSocialLogin as SocialLogin } from "react-social-login";
import google from "../Assets/image 1.png";
import { setCookie } from "../Assets/coockie";
export const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  //on submit save data to cookies
  const handleSubmit = () => {
    setCookie("username", data.username, 100);
    setCookie("password", data.password, 100);
    setCookie("isLogin", true, 100);
    window.location.href = "/home";
  };
  const handleSocialGoogleLogin = (response) => {
    console.log(response);
  };

  return (
    <div className="login-container">
      <div className="header">
        <div className="logo">
          <MySVG />
          <span>FilterPixel</span>
        </div>

        <button>Sign Up</button>
      </div>

      <div className="conteiner">
        <div className="form">
          <SocialLogin
            provider="google"
            appId="734050624530-dso01cdgljbm2giejdjcv11tonrde8bg.apps.googleusercontent.com"
            onLoginSuccess={handleSocialGoogleLogin}
            onLogoutFailure={(data) => console.log(data)}
            redirectUri={"http://localhost:3000"}
          >
            <div className="google-btn">
              <img src={google} alt="no imge" />
              <span>Login with google</span>
            </div>
          </SocialLogin>

          <div className="or">
            <div className="line"></div>
            <span>OR</span>
            <div className="line"></div>
          </div>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setData({
                ...data,
                username: e.target.value,
              })
            }
          />
          <input type="password" placeholder="Password" />
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
