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
import { getFilteredData, getVisibleData } from "../../utils/Filter";

function Movies({ navigationVisible, handleCloseClick, handleMenuClick, storedData, savedMovies }) {
  const [searchResult, setSearchResult] = React.useState("notStarted");
  const [searchStatus, setSearchStatus] = React.useState("notStarted");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [visibleData, setVisibleData] = React.useState([]);
  const [switchOn, setSwitchOn] = React.useState(false);

  const onSwitch = () => {
    setSwitchOn(!switchOn);
  }

  const render = (items) => {
    setFilteredData(getFilteredData({ searchQuery, switchOn }, items));
    if (getFilteredData({ searchQuery, switchOn }, items).length === 0) {
      setSearchStatus('started');
      setSearchResult('emptyResult');
    } else {
      setVisibleData(getVisibleData(getFilteredData({ searchQuery, switchOn }, items)));
      setSearchStatus('started');
      setSearchResult('success');
    }
  }

  const onSearchQueryChange = (evt) => {
    setSearchQuery(evt.target.value);
  }

  const getMovies = (evt) => {
    evt.preventDefault();
    if (searchQuery === "") {
      setSearchStatus('started');
      setSearchResult('emptyQuery');
    } else {
      if (storedData) {
        setData(storedData);
        render(storedData);
      } else if (data.length !== 0) {
        render(data);
      } else {
        setSearchStatus('started');
        setSearchResult("inProcess");
        moviesApi.getMovies()
          .then((movies) => {
            localStorage.setItem("movies", JSON.stringify(movies));
            setData(movies);
            render(movies);
          }).catch(() => {
            setSearchResult("fail");
          });
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

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setFilteredData(getFilteredData({ searchQuery, switchOn }, data));
      setVisibleData(getVisibleData(getFilteredData({ searchQuery, switchOn }, data)));
      setSearchResult("success");
    })
  }, [data, searchQuery, switchOn]);

  React.useEffect(() => {
    setFilteredData(getFilteredData({ searchQuery, switchOn }, data));
    setVisibleData(getVisibleData(getFilteredData({ searchQuery, switchOn }, data)));
    if (getFilteredData({ searchQuery, switchOn }, data).length === 0) {
      setSearchResult("emptyResult");
    } else if (searchQuery === '') {
      setSearchResult("emptyQuery");
    } else {
      setSearchResult("success");
    }
  }, [switchOn]);

  return (
    <div className="page">
      <Header place="Movies" handleMenuClick={handleMenuClick} />
      <SearchForm onSubmit={getMovies} onChange={onSearchQueryChange} onSwitch={onSwitch} />
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
                      <MoviesCardList movies={visibleData} component="Movies" savedMovies={savedMovies} />
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