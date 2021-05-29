import React from "react";
import "./App.css";
import "../../vendor/styles/normalize.css";
import "../../vendor/fonts/fonts.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";

function App() {
  return (
    <>
      <Header place="Movies" />
      {/*<Main />*/}
      <Movies />
      <Footer />
    </>
  );
}

export default App;
