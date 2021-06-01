import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import "../../utils/shared.css";
import logo from "../../images/logo.svg";

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [passwordIsValid, setPasswordIsValid] = React.useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = React.useState('');
  const [passwordValidationMessage, setPasswordValidationMessage] = React.useState('');

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
      <section className="login">
        <form onSubmit={onSubmit} className="login-form" noValidate>
          <Link to="/">
            <img className="login-form__logo link" alt="Логотип" src={logo} />
          </Link>
          <h2 className="login-form__title">Рады видеть!</h2>
          <label className="login-form__form-field">
            <span className="login-form__input-name">E-mail</span>
            <input
              type="email"
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
              type="password"
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
          <input
            type="submit"
            className={
              emailIsValid && passwordIsValid
                ? "login-form__submit button"
                : "login-form__submit disabled-button"
            }
            value="Войти"
            disabled={emailIsValid && passwordIsValid ? false : true}
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