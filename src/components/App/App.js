import "./App.css";
import "../../vendor/styles/normalize.css";
import "../../vendor/fonts/fonts.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  return (
    <>
      <Header place='Main' />
      <Main />
      <Footer />
    </>
  );
}

export default App;
