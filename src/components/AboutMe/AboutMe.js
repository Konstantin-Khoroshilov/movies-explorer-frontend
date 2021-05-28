import React from "react";
import "../../utils/shared.css";
import "./AboutMe.css";
import student from "../../images/student-photo.png";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="section-header">Студент</h2>
      <div className="about-me__self-information">
        <div>
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__summary">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
        </div>
        <img className="about-me__photo" alt="Фото студента" src={student} />
        <ul className="about-me__contacts">
          <li>
            <a
              href="https://www.facebook.com/"
              className="about-me__contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Konstantin-Khoroshilov/"
              className="about-me__contact"
              rel="noopener noreferrer"
              target="_blank"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
      <h3 className="about-me__portfolio-title">Портфолио</h3>
      <a
        href="https://konstantin-khoroshilov.github.io/how-to-learn/"
        className="about-me__project"
        target="_blank"
        rel="noopener noreferrer"
      >
        Статичный сайт
        <span>↗</span>
      </a>
      <a
        href="https://konstantin-khoroshilov.github.io/russian-travel/"
        className="about-me__project"
        target="_blank"
        rel="noopener noreferrer"
      >
        Адаптивный сайт
        <span>↗</span>
      </a>
      <a
        href="https://oneofthebest.students.nomoredomains.icu/"
        className="about-me__project"
        target="_blank"
        rel="noopener noreferrer"
      >
        Одностраничное приложение
        <span>↗</span>
      </a>
    </section>
  );
}
export default AboutMe;
