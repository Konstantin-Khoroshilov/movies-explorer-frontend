import React from "react";
import "./App.css";
import "../../vendor/styles/normalize.css";
import "../../vendor/fonts/fonts.css";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { Route, Switch } from "react-router-dom";

function App() {
  const [navigationVisible, setNavigationVisible] = React.useState(false);
  const handleCloseClick = () => {
    setNavigationVisible(false);
  }
  const handleMenuClick = () => {
    setNavigationVisible(true);
  }
  const cardsLoadStatus = "success";
  const savedMovies = [
    {
      name: "В погоне за Бенкси. Бежим, бежим, бежим",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      _id: 1,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      _id: 2,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      _id: 6,
    },
    {
      name: "В погоне за Бенкси. Бежим, бежим, бежим",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      _id: 7,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      _id: 11,
    },
  ];
  const movies = [
    {
      name: "В погоне за Бенкси. Бежим, бежим, бежим",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      _id: 1,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      _id: 2,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: false,
      _id: 3,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: false,
      _id: 4,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: false,
      _id: 5,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      _id: 6,
    },
    {
      name: "В погоне за Бенкси. Бежим, бежим, бежим",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      _id: 7,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: false,
      _id: 8,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: false,
      _id: 9,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: false,
      _id: 10,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: true,
      _id: 11,
    },
    {
      name: "В погоне за Бенкси",
      duration: "27 минут",
      image: "https://api.interior.ru/media/images/setka/2020_05_31/banksy.jpg.webp",
      saved: false,
      _id: 12,
    },
  ];
  return (
    <Switch>
      <Route exact path ="/">
        <Main />
      </Route>
      <Route path ="/movies">
        <Movies
          navigationVisible={navigationVisible}
          handleCloseClick={handleCloseClick}
          handleMenuClick={handleMenuClick}
          movies={movies}
          cardsLoadStatus={cardsLoadStatus}
        />
      </Route>
      <Route path ="/saved-movies">
        <SavedMovies
          navigationVisible={navigationVisible}
          handleCloseClick={handleCloseClick}
          handleMenuClick={handleMenuClick}
          movies={savedMovies}
          cardsLoadStatus={cardsLoadStatus}
        />
      </Route>
      <Route path ="/profile">
        <Profile
          navigationVisible={navigationVisible}
          handleCloseClick={handleCloseClick}
          handleMenuClick={handleMenuClick}
        />
      </Route>
      <Route path ="/signin">
        <Login />
      </Route>
      <Route path ="/signup">
        <Register />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
