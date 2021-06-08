class Api {
  constructor(options) {
    this._moviesUrl = options.moviesUrl;
  }

  getMovies(token) {
    return fetch(this._moviesUrl)
      .then((res) => {
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
  moviesUrl: "https://api.nomoreparties.co/beatfilm-movies",
};

const moviesApi = new Api(apiData);

export default moviesApi;