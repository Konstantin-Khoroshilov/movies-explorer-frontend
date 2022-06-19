import React from "react";
import "./SavedMovies.css";
import "../../utils/shared.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  navigationVisible,
  handleCloseClick,
  handleMenuClick,
  movies,
  cardsLoadStatus
}) {
  return (
    <>
      <Header place="SavedMovies" handleMenuClick={handleMenuClick} />
      <SearchForm />
      <section className="saved-movies">
        <Navigation handleCloseClick={handleCloseClick} navigationVisible={navigationVisible} />
        {cardsLoadStatus === "success"
          ? (<MoviesCardList movies={movies} component="SavedMovies" />)
          : cardsLoadStatus === "inProcess"
          ? (<Preloader />)
          : (<h2>Не удалось загрузить данные с сервера.</h2>)
        }
      </section>
      <Footer />
    </>
  );
}
export default SavedMovies;