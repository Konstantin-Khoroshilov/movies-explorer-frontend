import React from "react";
import "../../utils/shared.css";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__project-info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__content">
        <p className="footer__copyright">&copy;2021</p>
        <nav>
          <ul className="footer__links elements-list">
            <li>
              <a
                href="https://praktikum.yandex.ru/"
                className="footer__link link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                href="https://github.com/"
                className="footer__link link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/"
                className="footer__link link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;