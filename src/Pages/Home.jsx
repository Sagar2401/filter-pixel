import React, { useState } from "react";
import { ReactComponent as MySVG } from "../Assets/newlogo 1.svg";
import profile from "../Assets/profile.png";
import { getCookie } from "../Assets/coockie";
import { Drive } from "./Drive";
import { S3 } from "./S3";
export const Home = () => {
  const name = getCookie("username");
  const [active, setActive] = useState(0);
  return (
    <div className="home-container">
      <div className="header">
        <div className="logo">
          <MySVG />
          <span>FilterPixel</span>
        </div>
        <div className="name-wrap">
          <span className="name">Hi, {name}</span>
          <img src={profile} alt="" />
        </div>
      </div>
      <div className="content">
        <div className="tab">
          <button
            className={`tabs ${active === 0 ? "active" : ""}`}
            onClick={() => setActive(0)}
          >
            S3
          </button>
          <button
            onClick={() => setActive(1)}
            className={`tabs ${active === 1 ? "active" : ""}`}
          >
            Google drive
          </button>
        </div>
        {active === 0 ? <S3 /> : <Drive />}
      </div>
    </div>
  );
};
