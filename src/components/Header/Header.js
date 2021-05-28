import React from "react";
import { Link } from 'react-router-dom';  
import "./Header.css";
import logo from "../../images/logo.svg";

function Header({ place }) {
  if (place === "Main") {
    return (
      <header className="header">
        <img className="header__logo" alt="Логотип" src={logo} />
        <nav className="header__link-container">
          <Link className="header__register-link" to="/signup">Регистрация</Link>
          <Link className="header__login-link" to="/signin">Войти</Link>
        </nav>
      </header>
    );
  }
}
export default Header;