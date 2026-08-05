import React from "react";

function ImagePopup({ card, onClose }) {
  if (!card) return null;

  const { title = "Obra sin título", artist = "Artista desconocido", date = "", image = "" } = card || {};

  return (
    <div className={`popup-display ${card ? "popup-display_is-opened" : ""}`}>
      {/* Capa traslúcida para cerrar al hacer clic afuera */}
      <div className="popup-display__overlay" onClick={onClose} />

      <div className="popup-display__content">
        <button
          type="button"
          className="popup-display__close-button"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className="popup-display__image-wrapper">
          <img 
            src={image} 
            alt={`Visualización en alta resolución de: ${title}`} 
            className="popup-display__image"
          />
        </div>

        <div className="popup-display__caption">
          <h3 className="popup-display__title">{title}</h3>
          <p className="popup-display__meta">
            <span className="popup-display__artist">{artist}</span>
            {date && <span className="popup-display__separator"> • </span>}
            {date && <span className="popup-display__date">{date}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;