import React from "react";
import "./MoviesCard.css";
import cinemaIcon from "../../images/cinema-icon.svg";

function MoviesCard({ movie, component }) {
  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins/60);
	  let minutes = mins % 60;
    if(hours===0) {
      const minsDeclensions = ["минута", "минуты", "минут"];
      const declOfNum = (number, words) => {  
        return mins + " " + words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
      }
      return declOfNum(mins, minsDeclensions);
    }
	  return hours + "ч " + minutes + "м";
  };
  return (
    <li>
      <figure className="movies-list__movie">
        <figcaption className="movies-list__movie-caption">
          <span className="movies-list__movie-name" title={movie.nameRU}>{movie.nameRU}</span>
          <span className="movies-list__movie-duration">{getTimeFromMins(movie.duration)}</span>
        </figcaption>
        <a
          href={movie.trailerLink}
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="movies-list__movie-image"
            src={movie.image ? `https://api.nomoreparties.co${movie.image.url}` : cinemaIcon}
            alt={movie.nameRU}
          />
        </a>
        {component === "SavedMovies" ? (
          <button
            type="button"
            className="movies-list__button movies-list__button_type_delete button"
          ></button>
        ) : !movie.saved ? (
          <button
            type="button"
            className="movies-list__button button"
          >Сохранить</button>
        ) : (
          <button
            type="button"
            className="movies-list__button movies-list__button_type_saved button"
          ><span className="movies-list__check-button"></span></button>
        )}
      </figure>
    </li>
  );
}
export default MoviesCard;