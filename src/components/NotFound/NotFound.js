import React from "react";
import { useHistory } from 'react-router-dom'; 
import "./NotFound.css";

function NotFound() {
  const history = useHistory(); 
  return (
    <section className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__back-button" onClick={() => history.goBack()}>Назад</button>
    </section>
  );
};

export default NotFound;