import React from "react";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <i className="preloader__spinner"></i>
        <p className="preloader__text">Buscando en el archivo del museo...</p>
      </div>
    </div>
  );
}

export default Preloader;