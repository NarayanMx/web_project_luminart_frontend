import React from "react";

function ImagePopup({ card }) {

  const { title, artist, date, image } = card;

  return (
    <div className="popup-display">
      <div className="popup-display__image-container">
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
          <span className="popup-display__date">{date}</span>
        </p>
      </div>
    </div>
  );
}

export default ImagePopup;