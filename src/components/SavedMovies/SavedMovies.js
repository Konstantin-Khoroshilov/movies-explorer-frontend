import React from "react";
import "./SavedMovies.css";
import "../../utils/shared.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi";
import { getFilteredData } from "../../utils/Filter";

function SavedMovies({ navigationVisible, handleCloseClick, handleMenuClick, loggedIn }) {
  const [moviesLoadStatus, setMoviesLoadStatus] = React.useState("inProcess");
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [moviesFilterStatus, setMoviesFilterStatus] = React.useState("");
  const [switchOn, setSwitchOn] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const deleteMovie = (evt, movie) => {
    evt.target.className = "movies-list__button";
    evt.target.value = "...";
    mainApi.deleteMovie(movie.movieId)
      .then((deletedMovie) => {
        const newMovieList = [];
        savedMovies.forEach((item, index, array) => {
          if(item._id !== deletedMovie._id) newMovieList.push(item);
        })
        setSavedMovies(newMovieList);
      }).catch(() => {
        evt.target.className = "movies-list__button movies-list__button_type_delete button";
        evt.target.value = "";
      });
  }

  const filterMovies = (evt) => {
    evt.preventDefault();
    if (moviesLoadStatus === "success") {
      if (searchQuery === "") {
        setMoviesFilterStatus("emptyQuery");
      } else {
        setFilteredMovies(getFilteredData({ searchQuery, switchOn }, savedMovies));
        if (getFilteredData({ searchQuery, switchOn }, savedMovies).length === 0) {
          setMoviesFilterStatus("emptyResult");
        } else {
          setMoviesFilterStatus("success");
        }
      }
    }
  }

  const onSwitch = () => {
    setSwitchOn(!switchOn);
  }

  const onSearchQueryChange = (evt) => {
    setSearchQuery(evt.target.value);
  }
  React.useEffect(() => {
    let cleanupFunction = false;
    mainApi.getSavedMovies()
      .then((savedMovies) => {
        if(!cleanupFunction) setSavedMovies(savedMovies);
        if (savedMovies.length === 0) {
          setMoviesLoadStatus("emptyResult");
        } else {
          setMoviesLoadStatus("success");
        }
      }).catch(() => {
        setMoviesLoadStatus("fail");
      });
      return () => cleanupFunction = true;
  }, [])
  return (
    <>
      <Header place="SavedMovies" handleMenuClick={handleMenuClick} loggedIn={loggedIn} />
      <SearchForm onSubmit={filterMovies} onChange={onSearchQueryChange} onSwitch={onSwitch} />
      <section className="saved-movies">
        <Navigation handleCloseClick={handleCloseClick} navigationVisible={navigationVisible} />
        {moviesLoadStatus === "success"
          ? (<MoviesCardList movies={savedMovies} component="SavedMovies" deleteMovie={deleteMovie} />)
          : moviesLoadStatus === "inProcess"
            ? (<Preloader />)
            : moviesFilterStatus === "success"
              ? (<MoviesCardList movies={filteredMovies} component="SavedMovies" deleteMovie={deleteMovie} />)
              : moviesFilterStatus === "emptyQuery"
                ? (<h2 className="saved-movies__search-status">
                  Нужно ввести ключевое слово
                </h2>)
                : moviesFilterStatus === "emptyResult"
                  ? (<h2 className="saved-movies__search-status">
                    Ничего не найдено
                  </h2>)
                  : moviesLoadStatus === "emptyResult"
                    ? (<h2 className="saved-movies__search-status">
                      Нет сохраненных фильмов
                    </h2>)
                    : (<h2 className="saved-movies__search-status">
                      Во время запроса произошла ошибка.
                      Возможно, проблема с соединением или сервер недоступен.
                      Подождите немного и попробуйте ещё раз
                    </h2>)
        }
      </section>
      <Footer />
    </>
  );
}
export default SavedMovies;