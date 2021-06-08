class Api {
  constructor(options) {
    this._savedMoviesUrl = options.savedMoviesUrl;
    this._getUserDataUrl = options.getUserDataUrl;
    this._updateUserDataUrl = options.updateUserDataUrl;
    this._addNewMovieUrl = options.addNewMovieUrl;
    this._deleteMovieUrl = options.deleteMovieUrl;
    this._signupUrl = options.signupUrl;
    this._signinUrl = options.signinUrl;
    //this._authorization = options.authorization;
  }
  signup(name, email, password) {
    return fetch(this._signupUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(res);
    });
  }
  signin(email, password) {
    return fetch(this._signinUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(res);
    });
  }
  getUserInfo(token) {
    return fetch(this._updateUserDataUrl, {
      headers: {
        authorization: token ? token : this._authorizationtoken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(
        `Что-то пошло не так c загрузкой данных пользователя: ${res.status}`
      );
    });
  }
  updateUserInfo(userName, email) {
    return fetch(this._updateUserDataUrl, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        email: email,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(
        `Что-то пошло не так c обновлением данных пользователя: ${res.status}`
      );
    });
  }
  addNewMovie(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  ) {
    return fetch(this._addNewMovieUrl, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(
        `Что-то пошло не так с сохранением фильма: ${res.status}`
      );
    });
  }
  deleteMovie(movieId) {
    return fetch(`${this._deleteMovieUrl}${movieId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(
        `Что-то пошло не так c удалением фильма: ${res.status}`
      );
    });
  }
  getSavedMovies(token) {
    return fetch(this._savedMoviesUrl, {
      headers: {
        authorization: token //? token : this._authorizationtoken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(
        `Что-то пошло не так c загрузкой фильмов: ${res.status}`
      );
    });
  }
}

const apiData = {
  savedMoviesUrl: "https://api.my-movies.students.nomoredomains.club/movies",
  signupUrl: "https://api.my-movies.students.nomoredomains.club/signup",
  signinUrl: "https://api.my-movies.students.nomoredomains.club/signin",
  getUserDataUrl:
    "https://api.my-movies.students.nomoredomains.club/users/me",
  updateUserDataUrl:
    "https://api.my-movies.students.nomoredomains.club/users/me",
  addNewMovieUrl: "https://api.my-movies.students.nomoredomains.club/movies",
  deleteMovieUrl: "https://api.my-movies.students.nomoredomains.club/movies/",
  //authorization: localStorage.getItem("token"),
};

const mainApi = new Api(apiData);

export default mainApi;