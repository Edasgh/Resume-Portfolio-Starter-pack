import React, { useEffect, useRef, useState } from "react";

const Portfolio = ({ data }) => {
  if (data) {
    var projects = data.projects.map(function (projects) {
      var projectImage = "images/portfolio/" + projects.image;
      return (
        <div key={projects.title} className="columns portfolio-item">
          <div className="item-wrap">
            <a
              href={projects.url}
              target="_blank"
              rel="noreferrer"
              title={projects.title}
            >
              <img alt={projects.title} src={projectImage} />
              <div className="overlay">
                <div className="portfolio-item-meta">
                  <h5>{projects.title}</h5>
                  <p>{projects.category}</p>
                </div>
              </div>
              <div className="link-icon">
                <i className="fa fa-link"></i>
              </div>
            </a>
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
             }
           }
         };
    
         window.addEventListener("scroll", handleScroll);
         handleScroll(); // Run on mount in case element is already in view
    
         return () => window.removeEventListener("scroll", handleScroll);
       }, []);

  return (
    <section className={isVisible?"fadeIn":"fadeIn_box"} id="portfolio" ref={boxRef} >
      <div className="row">
        <div className="twelve columns collapsed">
          <h1 style={{
            fontSize:"2.5rem",
            color:"black",
            textShadow:"1px 1px 5px grey, -1px -1px 5px grey"
          }} >Check Out Some of My Projects.</h1>

          <div
            id="portfolio-wrapper"
            className="bgrid-quarters s-bgrid-thirds cf"
          >
            {projects}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
