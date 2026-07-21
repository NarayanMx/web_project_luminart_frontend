import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <h2 className="not-found__subtitle">Lienzo en blanco</h2>
        <p className="not-found__text">La obra o ruta que intentas consultar está fuera de la matrix</p>
        <Link to="/" className="not-found__link">Regresar a la galería</Link>
      </div>
    </div>
  );
} 

export default NotFound;