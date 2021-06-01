import React from "react";
import { Link, NavLink } from 'react-router-dom';
import profileIcon from "../../images/profile-icon.svg";
import "./Navigation.css";

function Navigation({handleCloseClick, navigationVisible}) {
  return (
    <nav
      className={
        navigationVisible
          ? "navigation"
          : "navigation navigation_hidden"
      }
    >
      <button type="button" className="navigation__close-button" onClick={handleCloseClick}></button>
      <ul className="navigation__links">
        <li>
          <NavLink exact to="/" activeClassName="navigation__link_active" className="navigation__link link">Главная</NavLink>
        </li>
        <li>
          <NavLink to="/movies" activeClassName="navigation__link_active" className="navigation__link link">Фильмы</NavLink>
        </li>
        <li>
          <NavLink to="/saved-movies" activeClassName="navigation__link_active" className="navigation__link link">Сохранённые&nbsp;фильмы</NavLink>
        </li>
      </ul>
      <Link className="navigation__profile link" to="/profile">
        Аккаунт
        <img className="navigation__profile-icon" alt="Иконка профиля" src={profileIcon} /> 
      </Link>
    </nav>
  );
};

export default Navigation;