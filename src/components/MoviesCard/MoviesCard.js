import React from "react";
import "./MoviesCard.css";
import cinemaIcon from "../../images/cinema-icon.svg";

function MoviesCard({ component, movie, saveMovie, deleteMovie, movieSaved, removeSavedMovie }) {
  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    if (hours === 0) {
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
          href={movie.trailerLink ? movie.trailerLink : movie.trailer }
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="movies-list__movie-image"
            src={component === "SavedMovies" ? movie.image : movie.image ? `https://api.nomoreparties.co${movie.image.url}` : cinemaIcon}
            alt={movie.nameRU}
          />
        </a>
        {component === "SavedMovies" ? (
          <input
            type="button"
            className="movies-list__button movies-list__button_type_delete button"
            onClick={(evt) => { deleteMovie(evt, movie) }}
            value=""
          />
        ) : !movieSaved ? (
          <input
            type="button"
            className="movies-list__button button"
            onClick={(evt) => { saveMovie(evt, movie) }}
            value="Сохранить"
          />
        ) : (
          <input
            type="button"
            className="movies-list__button movies-list__button_type_saved button"
            value=""
            onClick={(evt) => { saveMovie(evt, movie) }}
          />
        )}
      </figure>
    </li>
  );
}
export default MoviesCard;