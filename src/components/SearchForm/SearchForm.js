import React from "react";
import "./SearchForm.css";
import "../../utils/shared.css";

function SearchForm() {
  return (
    <form className="search-form">
      <label className="search-form__search-string">
        <input className="search-form__text" type="text" placeholder="Фильм" />
        <button className="search-form__submit button" type="submit"><span className="search-form__button"></span></button>
      </label>
      <label className="search-form__short-films" tabIndex="0">
        <div className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider round"></span>
        </div>
        <span className="search-form__short-films-title">Короткометражки</span>
      </label>
    </form> 
  );
}
export default SearchForm;