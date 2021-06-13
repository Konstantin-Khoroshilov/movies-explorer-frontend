import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import "../../utils/shared.css";
import logo from "../../images/logo.svg";

function Register({ onSubmit, reqStatusMsg, formStatus }) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [nameIsValid, setNameIsValid] = React.useState(false);
  const [passwordIsValid, setPasswordIsValid] = React.useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = React.useState("");
  const [nameValidationMessage, setNameValidationMessage] = React.useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] = React.useState("");

  const handleUserNameChange = (evt) => {
    setNameValidationMessage(
      !evt.target.validity.valid
        ? "Допускаются латинские и кириллические буквы, цифры, пробел и дефис. Минимум один символ. Имя не может начинаться с пробела."
        : "");
    setNameIsValid(evt.target.validity.valid);
    setName(evt.target.value);
  }

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

  const handleRegisterUser = (evt) => {
    evt.preventDefault();
    onSubmit(name, email, password);
  }

  return (
    <>
      <section className="register">
        <form onSubmit={handleRegisterUser} className="register-form" noValidate>
          <Link to="/">
            <img className="register-form__logo link" alt="Логотип" src={logo} />
          </Link>
          <h2 className="register-form__title">Добро пожаловать!</h2>
          <label className="register-form__form-field">
            <span className="register-form__input-name">Имя</span>
            <input
              disabled={formStatus === "sending" ? true : false}
              type="text"
              pattern="^[a-zA-Zа-яёА-ЯЁ][a-zA-Zа-яёА-ЯЁ0-9-\.]*$"
              placeholder="Имя"
              className={
                nameIsValid
                  ? "register-form__text-input"
                  : "register-form__text-input invalid-input"
              }
              required
              minLength="1"
              maxLength="30"
              onChange={handleUserNameChange}
              value={name}
            />
          </label>
          <span className="register-form__error-message-container">
            {nameValidationMessage}
          </span>
          <label className="register-form__form-field">
            <span className="register-form__input-name">E-mail</span>
            <input
              disabled={formStatus === "sending" ? true : false}
              type="text"
              pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
              placeholder="E-mail"
              className={
                emailIsValid
                  ? "register-form__text-input"
                  : "register-form__text-input invalid-input"
              }
              onChange={handleEmailChange}
              required
              value={email}
            />
          </label>
          <span className="register-form__error-message-container">
            {emailValidationMessage}
          </span>
          <label className="register-form__form-field">
            <span className="register-form__input-name">Пароль</span>
            <input
              disabled={formStatus === "sending" ? true : false}
              type="password"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
              placeholder="Пароль"
              minLength="8"
              maxLength="30"
              className={
                passwordIsValid
                  ? "register-form__text-input"
                  : "register-form__text-input invalid-input"
              }
              onChange={handlePasswordChange}
              required
              value={password}
            />
          </label>
          <span className="register-form__error-message-container">
            {passwordValidationMessage}
          </span>
          <span className="register-form__reg-status-container">{reqStatusMsg}</span>
          <input
            type="submit"
            className={
              emailIsValid && nameIsValid && passwordIsValid && formStatus !== "sending"
                ? "register-form__submit button"
                : "register-form__submit disabled-button"
            }
            value="Зарегистрироваться"
            disabled={emailIsValid && nameIsValid && passwordIsValid && formStatus !== "sending" ? false : true}
          />
        </form>
        <p className="register__auth-block">
          Уже зарегистрированы? <Link className="register__auth-link" to="/signin">Войти</Link>
        </p>
      </section>
    </>
  );
};

export default Register;