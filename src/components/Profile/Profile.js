import React from "react";
import "./Profile.css";
import "../../utils/shared.css"
import Header from "../../components/Header/Header";
import Navigation from "../Navigation/Navigation";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ navigationVisible, handleCloseClick, handleMenuClick, reqStatusMsg, handleUserUpdate, onLogout, loggedIn, formStatus }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [email, setEmail] = React.useState(currentUser.email);
  const [name, setName] = React.useState(currentUser.name);
  const [emailIsValid, setEmailIsValid] = React.useState(true);
  const [nameIsValid, setNameIsValid] = React.useState(true);
  const [emailValidationMessage, setEmailValidationMessage] = React.useState("");
  const [nameValidationMessage, setNameValidationMessage] = React.useState("");
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
  const onSubmit = (evt) => {
    evt.preventDefault();
    handleUserUpdate(name, email);
  }
  const handleLogOff = () => {
    onLogout();
  }
  return (
    <>
      <Header place="Profile" handleMenuClick={handleMenuClick} loggedIn={loggedIn} />
      <section className="profile">
        <Navigation handleCloseClick={handleCloseClick} navigationVisible={navigationVisible} />
        <form onSubmit={onSubmit} className="profile-form" noValidate>
          <h2 className="profile-form__title">Привет, {currentUser.name}!</h2>
          <label className="profile-form__form-field">
            <span className="profile-form__input-name">Имя</span>
            <input
              disabled={formStatus === "sending" ? true : false}
              type="text"
              pattern="^[a-zA-Zа-яёА-ЯЁ][a-zA-Zа-яёА-ЯЁ0-9-\.]*$"
              placeholder="Имя"
              className={
                nameIsValid
                  ? "profile-form__text-input"
                  : "profile-form__text-input invalid-input"
              }
              required
              minLength="1"
              maxLength="30"
              onChange={handleUserNameChange}
              value={name}
            />
          </label>
          <span className="profile-form__error-message-container">
            {nameValidationMessage}
          </span>
          <label className="profile-form__form-field">
            <span className="profile-form__input-name">E-mail</span>
            <input
              disabled={formStatus === "sending" ? true : false}
              type="text"
              pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
              placeholder="E-mail"
              className={
                emailIsValid
                  ? "profile-form__text-input"
                  : "profile-form__text-input invalid-input"
              }
              onChange={handleEmailChange}
              required
              value={email}
            />
          </label>
          <span className="profile-form__error-message-container">
            {emailValidationMessage}
          </span>
          <span className="profile-form__request-status-container">{reqStatusMsg}</span>
          <input
            type="submit"
            className={
              emailIsValid && nameIsValid && (email !== currentUser.email || name !== currentUser.name) && formStatus !== "sending"
                ? "profile-form__submit link"
                : "profile-form__submit disabled-button"
            }
            value="Редактировать"
            disabled={
              emailIsValid
                && nameIsValid
                && (email !== currentUser.email || name !== currentUser.name)
                && formStatus !== "sending"
                ? false
                : true
            }
          />
        </form>
        <button type="button" onClick={handleLogOff} className="profile__log-off-button">Выйти из аккаунта</button>
      </section>
    </>
  );
}

export default Profile;