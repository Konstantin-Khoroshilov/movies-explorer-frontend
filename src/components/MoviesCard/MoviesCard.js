import React from "react";
import "./MoviesCard.css";

function MoviesCard({movie, component}) {
  return (
    <li>
      <figure className="movies-list__movie">
      <figcaption className="movies-list__movie-caption">
          <span className="movies-list__movie-name" title={movie.name}>{movie.name}</span>
          <span className="movies-list__movie-duration" title={movie.duration}>{movie.duration}</span>
        </figcaption>
        <img
          className="movies-list__movie-image"
          src={movie.image}
          alt={movie.name}
        />
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