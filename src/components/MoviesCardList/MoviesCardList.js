import React from "react";
import "./MoviesCardList.css";
import "../../utils/shared.css";
import MoviesCard from "../../components/MoviesCard/MoviesCard";

function MoviesCardList({ movies, component, savedMovies, saveMovie }) {
  return (
    <div className="movies-list">
      <ul className="movies-list__container elements-list">
        {movies.map((movie) => {
          return (
            <MoviesCard
              component={component}
              movie={movie}
              saveMovie={saveMovie}
              movieSaved={
                component === "Movies"
                ? savedMovies.some((item) => {
                return item.id === movie.id;
              })
              : true
            }
              key={movie.id}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default MoviesCardList;