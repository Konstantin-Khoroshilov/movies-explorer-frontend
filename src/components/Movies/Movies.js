import React from "react";
import "./Movies.css";
import "../../utils/shared.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { getFilteredData, getVisibleData } from "../../utils/Filter";

function Movies({ navigationVisible, handleCloseClick, handleMenuClick, storedData, loggedIn }) {
  const [searchResult, setSearchResult] = React.useState("notStarted");
  const [searchStatus, setSearchStatus] = React.useState("notStarted");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [visibleData, setVisibleData] = React.useState([]);
  const [switchOn, setSwitchOn] = React.useState(storedData.switchOn ? storedData.switchOn : false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesLoadStatus, setSavedMoviesLoadStatus] = React.useState("inProcess");

  const storeData = (searchQuery, switchOn, movies) => {
    localStorage.setItem("movies", JSON.stringify({searchQuery, switchOn, movies}));
  }

  const getSavedMovies = (cleanupFunction) => {
    mainApi.getSavedMovies(localStorage.getItem("token"))
      .then((savedMovies) => {
        if (!cleanupFunction) {
          setSavedMovies(savedMovies);
          setSavedMoviesLoadStatus("success");
        }
      }).catch(() => {
        if (!cleanupFunction) setSavedMoviesLoadStatus("fail");
      });
  }

  const saveMovie = (evt, movie) => {
    if (!evt.target.classList.contains("movies-list__button_type_saved")) {
      evt.target.value = "...";
      mainApi.addNewMovie(
        movie.country ? movie.country : "Информация отсутствует",
        movie.director ? movie.director : "Информация отсутствует",
        movie.duration ? movie.duration : 0,
        movie.year ? movie.year : "Информация отсутствует",
        movie.description ? movie.description : "Информация отсутствует",
        `https://api.nomoreparties.co${movie.image.url}`,
        movie.trailer ? movie.trailer : movie.trailerLink ? movie.trailerLink : 'https://www.youtube.com/',
        movie.nameRU ? movie.nameRU : "Информация отсутствует",
        movie.nameEN ? movie.nameEN : "Информация отсутствует",
        `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        `${movie.id}`,
        localStorage.getItem("token")
      )
        .then(() => {
          getSavedMovies();
          evt.target.className = "movies-list__button movies-list__button_type_saved button";
          evt.target.value = "";
        }).catch(() => {
          evt.target.className = "movies-list__button button";
          evt.target.value = "Сохранить";
        })
    } else {
      evt.target.value = "...";
      mainApi.deleteMovie(movie.id, localStorage.getItem("token"))
        .then(() => {
          evt.target.className = "movies-list__button button";
          evt.target.value = "Сохранить";
        })
        .catch(() => {
          evt.target.className = "movies-list__button movies-list__button_type_saved button";
          evt.target.value = "";
        })
    }
  }

  const onSwitch = () => {
    setSwitchOn(!switchOn);
  }

  const render = (items) => {
    setFilteredData(getFilteredData({ searchQuery, switchOn }, items));
    if (getFilteredData({ searchQuery, switchOn }, items).length === 0) {
      setSearchStatus("started");
      setSearchResult("emptyResult");
    } else {
      setVisibleData(getVisibleData(getFilteredData({ searchQuery, switchOn }, items)));
      setSearchStatus("started");
      setSearchResult("success");
    }
  }

  const onSearchQueryChange = (evt) => {
    setSearchQuery(evt.target.value);
  }

  const getMovies = (evt) => {
    evt.preventDefault();
    if (searchQuery === "") {
      setSearchStatus("started");
      setSearchResult("emptyQuery");
    } else {
      if (savedMoviesLoadStatus === "inProcess") {
        setSearchStatus("started");
        setSearchResult("inProcess");
      } else if (savedMoviesLoadStatus === "success") {
        if (storedData) {
          setData(storedData.movies);
          render(storedData.movies);
          storeData(searchQuery, switchOn, storedData.movies);
        } else if (data.length !== 0) {
          render(data);
          storeData(searchQuery, switchOn, data);
        } else {
          setSearchStatus("started");
          setSearchResult("inProcess");
          moviesApi.getMovies()
            .then((movies) => {
              localStorage.setItem("movies", JSON.stringify(movies));
              storeData(searchQuery, switchOn, movies);
              setData(movies);
              render(movies);
            }).catch(() => {
              setSearchResult("fail");
            });
        }
      } else {
        setSearchStatus("started");
        setSearchResult("fail");
      }
    }
  }

  const handleMoreClick = () => {
    if (window.innerWidth >= 0 && window.innerWidth <= 480) {
      setVisibleData(filteredData.slice(0, visibleData.length + 2));
    }
    if (window.innerWidth > 480 && window.innerWidth < 1280) {
      setVisibleData(filteredData.slice(0, visibleData.length + 2));
    }
    if (window.innerWidth >= 1280) {
      setVisibleData(filteredData.slice(0, visibleData.length + 3));
    }
  }

  const removeSavedMovie = (evt, movie) => {
    evt.target.value = "...";
    evt.target.className = "movies-list__button button";
    console.log(movie.id)
    mainApi.deleteMovie(movie.id, localStorage.getItem("token"))
      .then(() => {
        evt.target.value = "Сохранить";
      })
      .catch(() => {
        evt.target.value = "";
        evt.target.className = "movies-list__button movies-list__button_type_saved button";
      })
  }

  React.useEffect(() => {
    if (savedMoviesLoadStatus === "success") {
      window.addEventListener("resize", () => {
        setFilteredData(getFilteredData({ searchQuery, switchOn }, data));
        setVisibleData(getVisibleData(getFilteredData({ searchQuery, switchOn }, data)));
        setSearchResult("success");
      })
    }
  }, [data, searchQuery, switchOn, savedMoviesLoadStatus]);

  React.useEffect(() => {
    if (savedMoviesLoadStatus === "success") {
      setFilteredData(getFilteredData({ searchQuery, switchOn }, data));
      setVisibleData(getVisibleData(getFilteredData({ searchQuery, switchOn }, data)));
      if (getFilteredData({ searchQuery, switchOn }, data).length === 0) {
        setSearchResult("emptyResult");
      } else if (searchQuery === "") {
        setSearchResult("emptyQuery");
      } else {
        setSearchResult("success");
      }
    }
  }, [switchOn]);

  React.useEffect(() => {
    let cleanupFunction = false;
    getSavedMovies(cleanupFunction);
    return () => cleanupFunction = true;
  }, []);

  React.useEffect(()=>{
    if (storedData) {
      setData(storedData.movies);
      setSearchQuery(storedData.searchQuery);
      setSwitchOn(storedData.switchOn);
      render(storedData.movies);
    }
  }, [data]);

  return (
    <div className="page">
      <Header place="Movies" handleMenuClick={handleMenuClick} loggedIn={loggedIn} />
      <SearchForm onSubmit={getMovies} onChange={onSearchQueryChange} onSwitch={onSwitch} searchQuery={searchQuery} switchOn={switchOn} />
      <section className="movies">
        <Navigation handleCloseClick={handleCloseClick} navigationVisible={navigationVisible} />
        <div className={
          searchStatus === "started"
            ? "movies__search-result"
            : "movies__search-result movies__search-result_hidden"
        }>
          {
            searchResult === "emptyQuery"
              ? (<h2 className="movies__search-status">Нужно ввести ключевое слово</h2>)
              : searchResult === "emptyResult"
                ? (<h2 className="movies__search-status">Ничего не найдено</h2>)
                : searchResult === "success"
                  ? (
                    <>
                      <MoviesCardList
                        movies={visibleData}
                        component="Movies"
                        savedMovies={savedMovies}
                        saveMovie={saveMovie}
                        removeSavedMovie={removeSavedMovie}
                      />
                      <button
                        className={
                          visibleData.length < filteredData.length
                            ? "movies__more-button button"
                            : "movies__more-button movies__more-button_hidden"
                        }
                        onClick={handleMoreClick}
                      >Ещё</button>
                    </>
                  )
                  : searchResult === "inProcess"
                    ? (<Preloader />)
                    : searchResult === "invalidInput"
                      ? (<h2 className="movies__search-status">Неверные параметры поиска</h2>)
                      : (<h2 className="movies__search-status">
                        Во время запроса произошла ошибка.
                        Возможно, проблема с соединением или сервер недоступен.
                        Подождите немного и попробуйте ещё раз
                      </h2>)
          }
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default Movies;