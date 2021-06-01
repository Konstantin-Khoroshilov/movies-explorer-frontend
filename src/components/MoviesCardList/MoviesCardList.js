import React from "react";
import "./MoviesCardList.css";
import "../../utils/shared.css";
import MoviesCard from "../../components/MoviesCard/MoviesCard"

function MoviesCardList({ movies, component }) {
  return (
    <div className="movies-list">
      <ul className="movies-list__container elements-list">
          {movies.map((movie) => {
            return (
              <MoviesCard
                component={component}
                movie={movie}
                key={movie._id}
              />
            );
          })}
      </ul>
    </div>
  );
}
export default MoviesCardList;