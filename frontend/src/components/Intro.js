import React from "react";
import "./Intro.css";
import graph1 from "../assests/images/graph.png";
import graph2 from "../assests/images/graph2.png";
import graph3 from "../assests/images/graph3.png";
import graph from "../assests/images/graph.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
const Intro = () => {
  return (
    <div className="intro">
      <div className="description">
        <span id="label">Ai Driven</span>
        <h1 id="intro-head-1">Beyond <span id="sub-head-1">earth,</span></h1>
        <h1 id="intro-head-2">Beyond <span id="sub-head-2">imaginations.</span></h1>
        <p id="subtext">
          AstraInsight uses advanced AI to analyze complex data, uncover
          patterns, and deliver precise, actionable insights. Our systems learn
          and adapt, ensuring you always have reliable intelligence to drive
          smarter decisions and achieve your goals.
        </p>
        <div className="btns">
        <Link to="/chat" id="intro-button">Chat</Link>
        <a id="intro-button-github" href="https://github.com/rahulaauji-30/pre-hackathon-assignment-levelsupermind.git" target="_blank"><GitHubIcon/> Repository</a>
        </div>
      </div>
      <div className="intro-images">
        <div className="circle-bg">
            <img src={graph} alt="earth" />
            <img src={graph3} alt="earth" />
            <img src={graph2} alt="earth" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
