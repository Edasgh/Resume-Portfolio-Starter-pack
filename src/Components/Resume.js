import React, { useEffect, useRef, useState } from "react";

const Resume = ({ data }) => {
  const boxRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (boxRef.current) {
        const boxTop = boxRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (boxTop < windowHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount in case element is already in view

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (data) {
    var skillmessage = data.skillmessage;
    var education = data.education.map(function (education) {
      return (
        <div key={education.school}>
          <h3>{education.school}</h3>
          <p className="info">
            {education.degree} <span>&bull;</span>
            <em className="date">{education.graduated}</em>
          </p>
          <p>{education.description}</p>
        </div>
      );
    });
    // var work = data.work.map(function (work) {
    //   return (
    //     <div key={work.company}>
    //       <h3>{work.company}</h3>
    //       <p className="info">
    //         {work.title}
    //         <span>&bull;</span> <em className="date">{work.years}</em>
    //       </p>
    //       <p>{work.description}</p>
    //     </div>
    //   );
    // });
    var skills = data.skills.map(function (skills) {
      var className = `bar-expand ${
        isVisible ? skills.name.toLowerCase() : ""
      }`;
      return (
        <li key={skills.name}>
          <span style={{ width: skills.level }} className={className}></span>
          <em>{skills.name}</em>
        </li>
      );
    });
  }

  return (
    <section className={isVisible ? "fadeIn" : "fadeIn_box"} id="resume" ref={boxRef}>
      <div className="row education">
        <div className="three columns header-col">
          <h1>
            <span>Education</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">{education}</div>
          </div>
        </div>
      </div>

      {/* <div className="row work">
        <div className="three columns header-col">
          <h1>
            <span>Work</span>
          </h1>
        </div>

        <div className="nine columns main-col">{work}</div>
      </div> */}

      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <p>{skillmessage}</p>

          <div className="bars">
            <ul className="skills">{skills}</ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
