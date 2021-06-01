import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import "../../utils/shared.css";
import logo from "../../images/logo.svg";

function Register() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [nameIsValid, setNameIsValid] = React.useState(false);
  const [passwordIsValid, setPasswordIsValid] = React.useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = React.useState('');
  const [nameValidationMessage, setNameValidationMessage] = React.useState('');
  const [passwordValidationMessage, setPasswordValidationMessage] = React.useState('');
  const handleUserNameChange = (evt) => {
    setNameValidationMessage(evt.target.validationMessage);
    setNameIsValid(evt.target.validity.valid);
    setName(evt.target.value);
  }
  const handleEmailChange = (evt) => {
    setEmailValidationMessage(evt.target.validationMessage);
    setEmailIsValid(evt.target.validity.valid);
    setEmail(evt.target.value);
  }
  const handlePasswordChange = (evt) => {
    setPasswordValidationMessage(evt.target.validationMessage);
    setPasswordIsValid(evt.target.validity.valid);
    setPassword(evt.target.value);
  }
  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log('Форма отправлена!');
  };
  return (
    <>
      <section className="register">
        <form onSubmit={onSubmit} className="register-form" noValidate>
          <Link to="/">
            <img className="register-form__logo link" alt="Логотип" src={logo} />
          </Link>
          <h2 className="register-form__title">Добро пожаловать!</h2>
          <label className="register-form__form-field">
            <span className="register-form__input-name">Имя</span>
            <input
              type="text"
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
              type="email"
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
              type="password"
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
          <input
            type="submit"
            className={
              emailIsValid && nameIsValid && passwordIsValid
                ? "register-form__submit button"
                : "register-form__submit disabled-button"
            }
            value="Зарегистрироваться"
            disabled={emailIsValid && nameIsValid && passwordIsValid ? false : true}
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