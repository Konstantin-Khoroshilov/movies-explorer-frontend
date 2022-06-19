import React from "react";
import "./Profile.css";
import "../../utils/shared.css"
import Header from "../../components/Header/Header";
import Navigation from "../Navigation/Navigation";

function Profile({ navigationVisible, handleCloseClick, handleMenuClick }) {
  const [email, setEmail] = React.useState('pochta@yandex.ru');
  const [name, setName] = React.useState('Виталий');
  const [emailIsValid, setEmailIsValid] = React.useState(true);
  const [nameIsValid, setNameIsValid] = React.useState(true);
  const [emailValidationMessage, setEmailValidationMessage] = React.useState('');
  const [nameValidationMessage, setNameValidationMessage] = React.useState('');
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
  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log('Форма отправлена!');
  }
  const handleLogOff = () => {
    console.log('Пользователь вышел');
  }
  return (
    <>
      <Header place="Profile" handleMenuClick={handleMenuClick} />
      <section className="profile">
      <Navigation handleCloseClick={handleCloseClick} navigationVisible={navigationVisible} />
        <form onSubmit={onSubmit} className="profile-form" noValidate>
          <h2 className="profile-form__title">Привет, Виталий!</h2>
          <label className="profile-form__form-field">
            <span className="profile-form__input-name">Имя</span>
            <input
              type="text"
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
              type="email"
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
          <input
            type="submit"
            className={
              emailIsValid && nameIsValid
                ? "profile-form__submit link"
                : "profile-form__submit disabled-button"
            }
            value="Редактировать"
            disabled={emailIsValid && nameIsValid ? false : true}
          />
        </form>
        <button type="button" onClick={handleLogOff} className="profile__log-off-button">Выйти из аккаунта</button>
      </section>
    </>
  );
}

export default Profile;