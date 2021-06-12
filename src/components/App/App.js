import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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
import CurrentUserContext from "../../contexts/CurrentUserContext";
import mainApi from "../../utils/MainApi";

function App() {
  const history = useHistory();
  const [navigationVisible, setNavigationVisible] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [reqStatusMsg, setReqStatusMsg] = React.useState("");
  const handleCloseClick = () => {
    setNavigationVisible(false);
  }
  const handleMenuClick = () => {
    setNavigationVisible(true);
  }


  async function errHandler(err) {
    const errMsg = await err.text();
    if (errMsg) {
      const parsedErrMsg = JSON.parse(errMsg);
      if (parsedErrMsg.message === "celebrate request validation failed") {
        setReqStatusMsg(parsedErrMsg.validation.body.message)
      } else {
        setReqStatusMsg(parsedErrMsg.message);
      }
    } else {
      setReqStatusMsg(err);
    }
  }

  async function handleRegisterUser(name, email, password) {
    setReqStatusMsg("...");
    try {
      const tokenRequest = await mainApi.signup(name, email, password);
      const token = await tokenRequest;
      const user = await mainApi.getUserInfo(`Bearer ${token.token}`);
      setCurrentUser(user);
      localStorage.setItem("token", `Bearer ${token.token}`);
      setLoggedIn(true);
      history.push("/movies");
    } catch (err) {
      errHandler(err);
    } finally {
      setTimeout(() => {
        setReqStatusMsg("");
      }, 1000);
    }
  }

  async function handleLoginUser(email, password) {
    setReqStatusMsg("...");
    try {
      const tokenRequest = await mainApi.signin(email, password);
      const token = await tokenRequest;
      const user = await mainApi.getUserInfo(`Bearer ${token.token}`);
      setCurrentUser(user);
      localStorage.setItem("token", `Bearer ${token.token}`);
      setLoggedIn(true);
      history.push("/movies");
    } catch (err) {
      errHandler(err);
    } finally {
      setTimeout(() => {
        setReqStatusMsg("");
      }, 1000);
    }
  }

  async function handleUserUpdate(email, password) {
    setReqStatusMsg("...");
    try {
      const userRequest = await mainApi.updateUserInfo(email, password);
      const user = await userRequest;
      setCurrentUser(user);
      setReqStatusMsg("Данные успешно обновлены!");
    } catch (err) {
      errHandler(err);
    } finally {
      setTimeout(() => {
        setReqStatusMsg("");
      }, 1000);
    }
  }

  const handleLogOff = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/");
  }

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      mainApi.getUserInfo(token)
        .then((user) => {
          setLoggedIn(true);
          setCurrentUser(user);
          history.push("/movies");
        })
        .catch((err) => {
          errHandler(err);
        })
        .finally(() => {
          setTimeout(() => {
            setReqStatusMsg("");
          }, 1000);
        })
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main
            loggedIn={loggedIn}
            navigationVisible={navigationVisible}
            handleCloseClick={handleCloseClick}
            handleMenuClick={handleMenuClick}
          />
        </Route>
        <Route path="/movies">
          <Movies
            loggedIn={loggedIn}
            navigationVisible={navigationVisible}
            handleCloseClick={handleCloseClick}
            handleMenuClick={handleMenuClick}
            storedData={
              JSON.parse(localStorage.getItem("movies"))
                ? JSON.parse(localStorage.getItem("movies"))
                : false
            }
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            loggedIn={loggedIn}
            navigationVisible={navigationVisible}
            handleCloseClick={handleCloseClick}
            handleMenuClick={handleMenuClick}
          />
        </Route>
        <Route path="/profile">
          <Profile
            loggedIn={loggedIn}
            navigationVisible={navigationVisible}
            handleCloseClick={handleCloseClick}
            handleMenuClick={handleMenuClick}
            reqStatusMsg={reqStatusMsg}
            handleUserUpdate={handleUserUpdate}
            onLogout={handleLogOff}
          />
        </Route>
        <Route path="/signin">
          <Login onSubmit={handleLoginUser} reqStatusMsg={reqStatusMsg} />
        </Route>
        <Route path="/signup">
          <Register onSubmit={handleRegisterUser} reqStatusMsg={reqStatusMsg} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;