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

function SavedMovies({ navigationVisible, handleCloseClick, handleMenuClick, loggedIn, storedData }) {
  const [moviesLoadStatus, setMoviesLoadStatus] = React.useState("inProcess");
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [moviesFilterStatus, setMoviesFilterStatus] = React.useState("");
  const [switchOn, setSwitchOn] = React.useState(storedData.switchOn ? storedData.switchOn : false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pageStatus, setPageStatus] = React.useState("loadingInitCards");

  const storeData = (searchQuery, switchOn) => {
    localStorage.setItem("savedMoviesFilter", JSON.stringify({ searchQuery, switchOn }));
  }

  const onSwitch = () => {
    setSwitchOn(!switchOn);
  }

  const onSearchQueryChange = (evt) => {
    setSearchQuery(evt.target.value);
  }

  const deleteMovie = (evt, movie) => {
    evt.target.className = "movies-list__button";
    evt.target.value = "...";
    mainApi.deleteMovie(movie.movieId, localStorage.getItem("token"))
      .then((deletedMovie) => {
        const newMovieList = [];
        savedMovies.forEach((item, index, array) => {
          if (item._id !== deletedMovie._id) newMovieList.push(item);
        })
        setSavedMovies(newMovieList);
      }).catch(() => {
        evt.target.className = "movies-list__button movies-list__button_type_delete button";
        evt.target.value = "";
      });
  }

  const filterMovies = (evt) => {
    if (evt) evt.preventDefault();
    setPageStatus('filtetingMovies');
    if (searchQuery === "") {
      setMoviesFilterStatus("emptyQuery");
    } else {
      setFilteredMovies(getFilteredData({ searchQuery, switchOn }, savedMovies));
      storeData(searchQuery, switchOn);
      if (getFilteredData({ searchQuery, switchOn }, savedMovies).length !== 0) {
        setMoviesFilterStatus("success");
      } else {
        setMoviesFilterStatus("emptyResult");
      }
    }
  }

  React.useEffect(() => {
    let cleanupFunction = false;
    mainApi.getSavedMovies(localStorage.getItem("token"))
      .then((savedMovies) => {
        if (!cleanupFunction) {
          setSavedMovies(savedMovies);
          if (savedMovies.length === 0) {
            setMoviesLoadStatus("emptyResult");
          } else {
            setMoviesLoadStatus("success");
          }
        }
      }).catch(() => {
        setMoviesLoadStatus("fail");
      });
    return () => cleanupFunction = true;
  }, [])

  React.useEffect(() => {
    if (storedData) {
      setSwitchOn(storedData.switchOn);
      setSearchQuery(storedData.searchQuery);
      filterMovies();
    }
  }, [savedMovies]);

  React.useEffect(() => {
    setFilteredMovies(getFilteredData({ searchQuery, switchOn }, savedMovies));
    if (getFilteredData({ searchQuery, switchOn }, savedMovies).length !== 0) {
      setPageStatus('filtetingMovies');
      setMoviesFilterStatus("success");
    } else {
      setMoviesFilterStatus("emptyResult");
    }
  }, [switchOn, savedMovies]);

  return (
    <>
      <Header place="SavedMovies" handleMenuClick={handleMenuClick} loggedIn={loggedIn} />
      <SearchForm onSubmit={filterMovies} onChange={onSearchQueryChange} onSwitch={onSwitch} searchQuery={searchQuery} switchOn={switchOn} />
      <section className="saved-movies">
        <Navigation handleCloseClick={handleCloseClick} navigationVisible={navigationVisible} />
        {
          pageStatus === "loadingInitCards"
            ? moviesLoadStatus === "success"
              ? (<MoviesCardList movies={savedMovies} component="SavedMovies" deleteMovie={deleteMovie} />)
              : moviesLoadStatus === "inProcess"
                ? (<Preloader />)
                : moviesLoadStatus === "emptyResult"
                  ? (<h2 className="saved-movies__search-status">Нет сохраненных фильмов</h2>)
                  : (<h2 className="saved-movies__search-status">
                    Во время запроса произошла ошибка.
                    Возможно, проблема с соединением или сервер недоступен.
                    Подождите немного и попробуйте ещё раз
                  </h2>)
            : moviesFilterStatus === "success"
              ? (<MoviesCardList movies={filteredMovies} component="SavedMovies" deleteMovie={deleteMovie} />)
              : moviesFilterStatus === "emptyQuery"
                ? (<h2 className="saved-movies__search-status">Нужно ввести ключевое слово</h2>)
                : moviesFilterStatus === "emptyResult"
                  ? (<h2 className="saved-movies__search-status">Ничего не найдено</h2>)
                  : (<h2 className="saved-movies__search-status">Что-то пошло не так</h2>)
        }
      </section>
      <Footer />
    </>
  );
}
export default SavedMovies;