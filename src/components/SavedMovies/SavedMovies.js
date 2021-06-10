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
  cardsLoadStatus
}) {
  const savedMovies = [
    {
      name: "В погоне за Бенкси. Бежим, бежим, бежим",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      id: 1,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      id: 2,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      id: 6,
    },
    {
      name: "В погоне за Бенкси. Бежим, бежим, бежим",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      id: 7,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      id: 11,
    },
  ];
  return (
    <>
      <Header place="SavedMovies" handleMenuClick={handleMenuClick} />
      <SearchForm />
      <section className="saved-movies">
        <Navigation handleCloseClick={handleCloseClick} navigationVisible={navigationVisible} />
        {cardsLoadStatus === "success"
          ? (<MoviesCardList movies={savedMovies} component="SavedMovies" />)
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