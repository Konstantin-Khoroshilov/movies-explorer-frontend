import React from "react";
import { Link } from 'react-router-dom';  
import "./Header.css";
import logo from "../../images/logo.svg";
import profileIcon from "../../images/profile-icon.svg";
import "../../utils/shared.css";

function Header({ place, handleMenuClick }) {
  if (place === "Main") {
    return (
      <header className="header">
        <Link className="link" to="/">
          <img className="header__logo" alt="Логотип" src={logo} />
        </Link>
        <nav className="header__link-container">
          <ul className= "elements-list">
            <li>
              <Link className="header__register-link link" to="/signup">Регистрация</Link>
            </li>
            <li>
              <Link className="header__login-link button" to="/signin">Войти</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }

  if (place === "Movies" || place === "SavedMovies" || place === "Profile") {
    return (
      <header className="header header_place_movies">
        <Link className="link" to="/">
          <img className="header__logo" alt="Логотип" src={logo} />
        </Link>
        <nav className="header__link-container header__link-container_place_movies">
          <ul className="elements-list">
            <li>
              <Link className="header__movies link" to="/movies">Фильмы</Link>
            </li>
            <li>
              <Link className="header__saved-movies link" to="/saved-movies">Сохранённые фильмы</Link>
            </li>
          </ul>
          <ul className="elements-list">
            <li>
              <Link className="header__profile link" to="/profile">
                Аккаунт
                <img className="header__profile-icon" alt="Иконка профиля" src={profileIcon} /> 
              </Link>
            </li>
          </ul>
        </nav>
        <div className="header__burger button" onClick={handleMenuClick} tabIndex="0">
          <span className="header__burger-part"></span>
          <span className="header__burger-part"></span>
          <span className="header__burger-part"></span>
        </div>
      </header>
    );
  }
}
export default Header;