import React from "react";
import "../../utils/shared.css";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="section-header">Технологии</h2>
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="tech-list">
        <li className="tech-list__item">HTML</li>
        <li className="tech-list__item">CSS</li>
        <li className="tech-list__item">JS</li>
        <li className="tech-list__item">React</li>
        <li className="tech-list__item">Git</li>
        <li className="tech-list__item">Express.js</li>
        <li className="tech-list__item">mongoDB</li>
      </ul>
    </section>
  );
}
export default Techs;
