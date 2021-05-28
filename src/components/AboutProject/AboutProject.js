import React from "react";
import "../../utils/shared.css";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="section-header">О проекте</h2>
      <div className="about-project__articles-container">
        <article className="about-project__article">
          <h3 className="about-project__article-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__article-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </article>
        <article className="about-project__article">
          <h3 className="about-project__article-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__article-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <div className="about-project__stages-container">
        <p className="about-project__stage-duration">1 неделя</p>
        <p className="about-project__stage-duration about-project__stage-duration_stage_frontend">4 недели</p>
        <p className="about-project__stage-name">Back-end</p>
        <p className="about-project__stage-name">Front-end</p>
      </div>
    </section>
  );
}
export default AboutProject;