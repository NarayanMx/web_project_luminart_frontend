import React from "react";

function ImagePopup({ card, onClose }) {

  if (!card) return null;

  const { title = "", artist = "", date = "", image = "" } = card || {};

  return (
    <div className={`popup-display ${card ? "popup-display_is-opened" : ""}`}>
      <div className="popup-display__image-container">

        <button
          type="button"
          className="popup-display__close-button"
          onClick={onClose}
        />

        <div className="popup-display__image-container">
        <img 
          src={image} 
          alt={`Visualización en alta resolución de: ${title}`} 
          className="popup-display__image"
        />
        </div>

      </div>
      
      <div className="popup-display__caption">
        <h3 className="popup-display__title">{title}</h3>
        <p className="popup-display__meta">
          <span className="popup-display__artist">{artist}</span>
          {date && <span className="popup-display__separator"> • </span>}
          <span className="popup-display__date">{date}</span>
        </p>
      </div>
    </div>
  );
}

export default ImagePopup;