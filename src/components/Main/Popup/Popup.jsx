import React from "react";

import closeIcon from "../../../../images/Close_Icon.png";

export default function Popup(props) {

  const {title, children, onClose} = props;

  const handleOverlayClick =(e) => {
    if (e.target === e.currentTarget) {
    onClose();
    }
  };

  return (

  <div className="popup" onClick={handleOverlayClick}> 
    <div 
      className={`${
          !title ? "display__frame" : "popup__container"
        }`}
    >

      <button className="popup__close-button" onClick={onClose}>
        {/* 2. Reemplazamos el string por la variable procesada por Vite */}
        <img
          src={closeIcon}
          alt="botón para cerrar popup"
          className="popup__close-image"
        />
      </button>

      {title && <p className="popup__title">{title}</p>}

      <div className={`${
          !title ? "" : "popup__limit"
        }`}>
        {children}
      </div>
      
    </div>
  </div>
  )
}