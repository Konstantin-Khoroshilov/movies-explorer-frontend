import React from "react";
import "./Movies.css";
import "../../utils/shared.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Movies({ navigationVisible, handleCloseClick, handleMenuClick, movies, cardsLoadStatus }) {
  return (
    <>
      <Header place="Movies" handleMenuClick={handleMenuClick} />
      <SearchForm />
      <section className="movies">
        <Navigation handleCloseClick={handleCloseClick} navigationVisible={navigationVisible} />
        {cardsLoadStatus === "success"
          ? (
            <>
              <MoviesCardList movies={movies} component="Movies" />
              <button className="movies__more-button button">Ещё</button>
            </>
          )
          : cardsLoadStatus === "inProcess"
          ? (<Preloader />)
          : (<h2>Не удалось загрузить данные с сервера.</h2>)
        }
      </section>
      <Footer />
    </>
  );
}
export default Movies;