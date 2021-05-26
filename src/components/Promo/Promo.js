import React from "react";
import "./Promo.css"
import Header from "../Header/Header";

function Promo() {
  return (
    <>
      <Header place='Promo' />
      <section className="promo">
        <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
      </section>
    </>
  );
}
export default Promo;