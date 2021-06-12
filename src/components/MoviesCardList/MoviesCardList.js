import React from "react";
import "./MoviesCardList.css";
import "../../utils/shared.css";
import MoviesCard from "../../components/MoviesCard/MoviesCard";

function MoviesCardList({ movies, component, savedMovies, saveMovie, deleteMovie, removeSavedMovie }) {
  return (
    <div className="movies-list">
      <ul className="movies-list__container elements-list">
        {movies.map((movie) => {
          return (
            <MoviesCard
              component={component}
              movie={movie}
              saveMovie={saveMovie}
              deleteMovie={deleteMovie}
              removeSavedMovie={removeSavedMovie}
              movieSaved={
                component === "Movies"
                ? savedMovies.some((item) => {
                return item.nameRU === movie.nameRU;
              })
              : true
            }
              key={component === "Movies" ? movie.id : movie._id}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default MoviesCardList;