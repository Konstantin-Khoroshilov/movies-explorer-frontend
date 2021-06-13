import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import "../../utils/shared.css";
import logo from "../../images/logo.svg";

function Login({ onSubmit, reqStatusMsg, formStatus }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [passwordIsValid, setPasswordIsValid] = React.useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = React.useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] = React.useState("");

  const handleEmailChange = (evt) => {
    setEmailValidationMessage(
      !evt.target.validity.valid
        ? "Введите корректный e-mail адрес"
        : "");
    setEmailIsValid(evt.target.validity.valid);
    setEmail(evt.target.value);
  }
  const handlePasswordChange = (evt) => {
    setPasswordValidationMessage(
      !evt.target.validity.valid
        ? "Требуется не менее 8 символов: латинские буквы в верхнем и нижнем регистре, цифры. Другие символы не допускаются."
        : "");
    setPasswordIsValid(evt.target.validity.valid);
    setPassword(evt.target.value);
  }
  const handleLoginUser = (evt) => {
    evt.preventDefault();
    onSubmit(email, password);
  };
  return (
    <>
      <section className="login">
        <form onSubmit={handleLoginUser} className="login-form" noValidate >
          <Link to="/">
            <img className="login-form__logo link" alt="Логотип" src={logo} />
          </Link>
          <h2 className="login-form__title">Рады видеть!</h2>
          <label className="login-form__form-field">
            <span className="login-form__input-name">E-mail</span>
            <input
              disabled={formStatus === "sending" ? true : false}
              type="text"
              pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
              placeholder="E-mail"
              className={
                emailIsValid
                  ? "login-form__text-input"
                  : "login-form__text-input invalid-input"
              }
              onChange={handleEmailChange}
              required
              value={email}
            />
          </label>
          <span className="login-form__error-message-container">
            {emailValidationMessage}
          </span>
          <label className="login-form__form-field">
            <span className="login-form__input-name">Пароль</span>
            <input
              disabled={formStatus === "sending" ? true : false}
              type="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
              placeholder="Пароль"
              minLength="8"
              maxLength="30"
              className={
                passwordIsValid
                  ? "login-form__text-input"
                  : "login-form__text-input invalid-input"
              }
              onChange={handlePasswordChange}
              required
              value={password}
            />
          </label>
          <span className="login-form__error-message-container">
            {passwordValidationMessage}
          </span>
          <span className="login-form__request-status-container">{reqStatusMsg}</span>
          <input
            type="submit"
            className={
              emailIsValid && passwordIsValid && formStatus !== "sending"
                ? "login-form__submit button"
                : "login-form__submit disabled-button"
            }
            value="Войти"
            disabled={emailIsValid && passwordIsValid && formStatus !== "sending" ? false : true}
          />
        </form>
        <p className="login__auth-block">
          Ещё не зарегистрированы? <Link className="login__auth-link" to="/signup">Регистрация</Link>
        </p>
      </section>
    </>
  );
};

export default Login;