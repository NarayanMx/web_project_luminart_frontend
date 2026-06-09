import React from "react";
import ImagePopup from "../ImagePopup/ImagePopup";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import trashButtonIcon from "../../../images/Trash_Button.png";
import likeOnIcon from "../../../images/like_on.png";
import likeOffIcon from "../../../images/like_off.jpg";

function Card ({card, handleOpenPopup, onCardLike, onCardDelete}) {

  const { currentUser } = React.useContext(CurrentUserContext);

  const { name, link, } = card;

  const isLikedByMe = card.likes && card.likes.some((id) => id === currentUser._id);

  const imageComponent = {
    title: null,
    children: <ImagePopup card={card} />
  };

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (

    <li className="card"> 
      <img 
        src={link} 
        alt={name} 
        className="card__image"
        onClick={() => handleOpenPopup(imageComponent)} 
      />

      <button 
        className="card__delete-button" 
        aria-label="Delete card"
        onClick={handleCardDelete}> 
        {/* 2. Reemplazamos el string estático por la variable importada */}
        <img 
          src={trashButtonIcon}
          alt="botón eliminar activado"
        />
      </button>

      <div className="card__description">

        <h2 className="card__title">{name}</h2>

        <button 
          className="card__like-button" 
          aria-label="Like card"
          onClick={() => onCardLike(card)}>  
          {/* 3. Reemplazamos la condición lógica por las variables dinámicas del import */}
          <img 
            src={isLikedByMe ? likeOnIcon : likeOffIcon}
            alt="botón me gusta" 
            className="card__like-image"
          />
        </button>
      </div>
    </li>

  );
}

export default Card;