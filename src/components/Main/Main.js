import React from "react";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";

function Main() {
  return (
    <>
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
    </>
  );
}
export default Main;
