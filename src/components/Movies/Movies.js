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

function Movies({ navigationVisible, handleCloseClick, handleMenuClick }) {
  const [searchResult, setSearchResult] = React.useState('notStarted');
  const [searchStatus, setSearchStatus] = React.useState('notStarted');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [data, setData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [visibleData, setVisibleData] = React.useState([]);


  const onSearchQueryChange = (evt) => {
    setSearchQuery(evt.target.value);
  }

  const getMovies = (evt) => {
    setSearchStatus('started');
    evt.preventDefault();
    if (searchQuery === '') {
      setSearchResult('emptyQuery');
    } else if (data.length !== 0) {
      setFilteredData(getFilteredData(searchQuery, data));
      setVisibleData(getVisibleData(getFilteredData(searchQuery, data)));
      setSearchResult('success');
    } else {
      setSearchResult("fail");
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
    if (JSON.parse(localStorage.getItem('movies'))) {
      setData(JSON.parse(localStorage.getItem('movies')))
    } else {
      setSearchResult('inProcess');
      moviesApi.getMovies()
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies));
          setData(movies);
          setSearchResult('success');
        }).catch(() => {
          setSearchResult("fail");
        });
    }
  }, []);

  React.useEffect(()=>{
    window.addEventListener('resize', ()=>{
      setFilteredData(getFilteredData(searchQuery, data));
      setVisibleData(getVisibleData(getFilteredData(searchQuery, data)));
      setSearchResult('success');
    })
  }, [data, searchQuery]);

  return (
    <div className="page">
      <Header place="Movies" handleMenuClick={handleMenuClick} />
      <SearchForm onSubmit={getMovies} onChange={onSearchQueryChange} />
      <section className="movies">
        <Navigation handleCloseClick={handleCloseClick} navigationVisible={navigationVisible} />
        <div className={
          searchStatus === 'started'
            ? "movies__search-result"
            : "movies__search-result movies__search-result_hidden"
        }>
          {
            searchResult === "emptyQuery"
              ? (<h2>Нужно ввести ключевое слово</h2>)
              : filteredData.length === 0
                ? (<h2>Ничего не найдено</h2>)
                : searchResult === "success"
                  ? (
                    <>
                      <MoviesCardList movies={visibleData} component="Movies" />
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
                      ? (<h2>Неверные параметры поиска</h2>)
                      : (<h2>
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