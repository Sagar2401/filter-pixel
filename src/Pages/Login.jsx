import React, { useState } from "react";
import { ReactComponent as MySVG } from "../Assets/newlogo 1.svg";
import { OldSocialLogin as SocialLogin } from "react-social-login";
import google from "../Assets/image 1.png";
import { setCookie } from "../Assets/coockie";
import GoogleLogin from "react-google-login";
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

  const handleGoogleLoginLoginResponse = async function (response) {
    // Check if response has an error
    console.log(response);
    if (response.error !== undefined) {
      console.log(`Error: ${response.error}`);
      return false;
    } else {
      try {
        const fName = response.profileObj.givenName;
        const lName = response.profileObj.familyName;

        setCookie("username", fName + lName, 100);

        setCookie("isLogin", true, 100);
        window.location.href = "/home";
      } catch (error) {
        console.log("Error gathering Google user info, please try again!");
        alert("Error gathering Google user info, please try again!");
        return false;
      }
    }
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
          <GoogleLogin
            clientId="108490793456-0flm4qh8ek4cb4krt7e06980o4sjvado.apps.googleusercontent.com"
            render={(renderProps) => (
              <div className="google-btn" onClick={renderProps.onClick}>
                <img src={google} alt="no imge" />
                <span>Login with google</span>
              </div>
            )}
            buttonText="Login"
            onSuccess={handleGoogleLoginLoginResponse}
            onFailure={handleGoogleLoginLoginResponse}
            cookiePolicy={"single_host_origin"}
          />

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
