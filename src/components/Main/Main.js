import React from "react";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

function Main({ loggedIn, handleCloseClick, handleMenuClick, navigationVisible }) {
  return (
    <>
      <Header place="Main" handleMenuClick={handleMenuClick} loggedIn= {loggedIn} />
      <main className="main">
      <Navigation handleCloseClick={handleCloseClick} navigationVisible={navigationVisible} />
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}
export default Main;