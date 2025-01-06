import React, { useState } from "react";
import "./Team.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Arafat from "../assests/images/Arafat.jpeg";
import Rahul from "../assests/images/rahulpic.jpg";
import bug from "../assests/images/bug.svg"
const Team = () => {
  const members = [
    {
      name: "Rahul Parihar",
      role: "Full Stack Developer",
      description:
        "Final-year Computer Science student at Vishwakarma University, played a key role in developing the frontend for AstraInsight. With a strong foundation in web technologies, he brought the platform to life using modern design principles, ensuring an intuitive user experience. His expertise in React and UI/UX design was instrumental in delivering a seamless, responsive interface for users.",
      image: Rahul,
      email: "rahulaauji71@gmail.com",
      portfolio: "https://rahulportfolio.com",
      github:"https://github.com/rahulaauji-30",
      linkedIn:"https://www.linkedin.com/in/rahul-parihar-028200277"

    },
    {
      name: "Arafat Chougle",
      role: "WordPress Developer",
      description:
        "Final-year Computer Science student at Vishwakarma University, played a key role in developing the frontend for AstraInsight. With a strong foundation in web technologies, he brought the platform to life using modern design principles, ensuring an intuitive user experience. His expertise in React and UI/UX design was instrumental in delivering a seamless, responsive interface for users.",
      image: Arafat,
      email: "arafatchougle12@gmail.com",
      portfolio: "https://torquick.com/",
      github:"https://github.com/unique8080",
      linkedIn:"https://www.linkedin.com/in/arafat-chougle-8073a5221"
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(1);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length);
    setShowMoreOptions(false); // Close the options box on next
    setPrevIndex(currentIndex);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + members.length) % members.length
    );
    setShowMoreOptions(false); // Close the options box on previous
    setPrevIndex(currentIndex);
  };

  const toggleMoreOptions = () => {
    setShowMoreOptions((prevState) => !prevState);
  };

  const currentMember = members[currentIndex];
  const prevMember = members[prevIndex];

  return (
    <div className="team" id="team">
      <div className="title">
      <h1>the DebugeDuo</h1>
      <img src={bug}/>
      </div>
      <div className="members">
        <div className="member">
          <div className="member-details">
            <div className="member-description">
              <h1>{currentMember.name}</h1>
              <span id="member-role">{currentMember.role}</span>
              <p id="member-description">{currentMember.description}</p>
            </div>
            <div className="member-image">
              <img src={currentMember.image} alt={currentMember.name} />
              <img className="next-img" onClick={handleNext} src={prevMember.image} alt={currentMember.name} />
            </div>
          </div>
          <div className="member-btm-nav">
            <div className="member-links">
              <a
                href="https://github.com"
                style={{ color: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon style={{color:"var(--texts-all)"}} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon style={{color:"var(--texts-all)"}} />
              </a>
              <a onClick={toggleMoreOptions} className="more-options">
                <MoreVertIcon />
              </a>
              {showMoreOptions && (
                <div className="more-options-box">
                  <a href={`mailto:${currentMember.email}`}>Email</a>
                  <a
                    href={currentMember.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Portfolio
                  </a>
                </div>
              )}
            </div>
            <div className="btm-btns">
              <div className="left-btn" onClick={handlePrev}>
                <KeyboardArrowLeftIcon  />
              </div>
              <div className="right-btn" onClick={handleNext}>
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
