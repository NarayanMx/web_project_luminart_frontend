import React from "react";
import avatarImg from "../../../images/Profile_pic.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import editAvatarIcon from "../../../images/editProfileButton.png";
import editProfileIcon from "../../../images/Edit_Button.png";
import addCardIcon from "../../../images/Add_Button.png";

function Profile({ onOpenPopup, editProfilePopup, newCardPopup, editAvatarPopup }) {
 
  const { currentUser } = useContext(CurrentUserContext);
  
  return (

<section className="profile">
  <div className="profile__image-wrapper">
    <img
      src={currentUser.avatar} 
      alt="Imagen de perfil"
      className="profile__image"
    />
    {}
    <img
      src={editAvatarIcon}
      alt="Botón de editar perfil"
      className="profile__editButton"
      onClick={() => onOpenPopup(editAvatarPopup)}
    />
  </div>

  <div className="profile__info">
    <h1 className="profile__name">{currentUser.name}</h1>
    <p className="profile__role">{currentUser.about}</p>
    <button className="profile__edit-button" onClick={() => onOpenPopup(editProfilePopup)}>
      {}
      <img
        src={editProfileIcon}
        alt="botón para editar"
        className="profile__edit-image"
      />
    </button>
  </div>

  <button className="profile__add-button" onClick={() => onOpenPopup(newCardPopup)}>
    {}
    <img src={addCardIcon} alt="botón para agregar imagen" />
  </button>
</section>

  );
}

export default Profile;