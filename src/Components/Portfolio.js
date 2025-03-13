import React, { useEffect, useRef, useState } from "react";

const Portfolio = ({ data }) => {
  if (data) {
    var projects = data.projects.map(function (projects) {
      var projectImage = "images/portfolio/" + projects.image;
      return (
        <div
          key={projects.title}
          className="columns portfolio-item project-card"
        >
          <div className="item-wrap">
            <img alt={projects.title} src={projectImage} />
            <div className="overlay">
              <div className="portfolio-item-meta">
                <h3>{projects.title}</h3>
                <p>{projects.category}</p>
              </div>
            </div>
            <div className="link-icon">
              <a
                className="project-source-link"
                href={projects.url}
                target="_blank"
                rel="noreferrer"
                title="Source Code"
              >
                <i
                  style={{
                    color: "#13c3ed",
                  }}
                  className="fa-solid fa-file-lines"
                ></i>
              </a>

              <a
                className="project-source-link"
                href={projects.live}
                target="_blank"
                rel="noreferrer"
                title="Live Link"
              >
                <i
                  style={{
                    color: "palevioletred",
                  }}
                  className="fa-solid fa-up-right-from-square"
                ></i>
              </a>
            </div>
          </div>
        </div>
      );
    });
  }

  const boxRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (boxRef.current) {
        const boxTop = boxRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (boxTop < windowHeight - 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount in case element is already in view

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={isVisible ? "fadeIn" : "fadeIn_box"}
      id="portfolio"
      ref={boxRef}
    >
      <div className="row">
        <div className="twelve columns collapsed">
          <h1
            style={{
              fontSize: "3rem",
              color: "black",
              textShadow: "1px 1px 5px grey, -1px -1px 5px grey",
              lineHeight: "4rem",
            }}
          >
            My Projects and Contributions
          </h1>

          <div id="portfolio-wrapper" className="cf">
            {projects}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
