import React from "react";

import bookmarkOnIcon from "../../../images/bookmark_on.png";
import bookmarkOffIcon from "../../../images/bookmark_off.jpg";

function Card({ card, handleOpenPopup, onCardSave, saveArtIds }) {
  const { title, artist, date, image } = card;

  const isSaved = saveArtIds && saveArtIds.includes(card.id);

  return (
    <li className="card">
      <div className="card__image-container">
        <img
          src={image}
          alt={`Obra de arte titulada ${title} por ${artist}`}
          className="card__image"
          onClick={() => handleOpenPopup(card)} /* 👈 Le pasamos el objeto 'card' completo a App */
        />
      </div>

      <div className="card__description">
        <div className="card__info-block">
          <h2 className="card__title">{title}</h2>
          <p className="card__artist">{artist}</p>
          <span className="card__date">{date}</span>
        </div>

        <button 
          className="card__save-button"
          aria-label="Guardar en mi colección"
          onClick={() => onCardSave(card)}
        >
          <img
            src={isSaved ? bookmarkOnIcon : bookmarkOffIcon}
            alt={isSaved ? "Obra guardada" : "Guardar obra"}
            className="card__save-image"
          />
        </button>
      </div>
    </li>
  );
}

export default Card;