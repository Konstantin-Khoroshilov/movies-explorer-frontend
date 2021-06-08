import React from "react";
import "./SearchForm.css";
import "../../utils/shared.css";

function SearchForm({ onSubmit, onChange, onSwitch }) {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <label className="search-form__search-string">
        <input className="search-form__text" type="text" placeholder="Фильм" onChange={onChange} />
        <button className="search-form__submit button" type="submit"><span className="search-form__button"></span></button>
      </label>
      <label className="search-form__short-films" tabIndex="0">
        <div className="switch">
          <input type="checkbox" onChange={onSwitch} />
          <span className="slider round"></span>
        </div>
        <span className="search-form__short-films-title link">Короткометражки</span>
      </label>
    </form>
  );
}
export default SearchForm;