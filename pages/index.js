//Importaciónes!!

import { Card } from "../components/Card.js"
import {handleCardClick, enableListener} from "../components/utils.js"
import { FormValidator } from "../components/FormValidator.js"
import  Section from "../components/Section.js"
import  Popup from "../components/Popup.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForms.js"
import UserInfo from "../components/UserInfo.js"
import Api from "../components/Api.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"
let cardSection;


//Conectando todo al server :)
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "a64a0614-e6a5-4590-9e2b-f7d86ea0534e",
    "Content-Type": "application/json"
  }
});


//Cargar información del usuario inicial
api.getUserInfo()
.then(userData => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about
    });
    document.querySelector(".profile__image").src = userData.avatar;
})
.catch(err => console.error("Error al cargar usuario:", err));



//Solicitud de tarjetas iniciales
api.getInitialCards()
.then(items => {

cardSection = new Section({
items: items,
renderer: (item) => {
const card = new Card(item.name, item.link, ".template", handleCardClickWithPopup, item.isLiked, handleDeleteCard, item._id, api);
return card.generateCard();
}},
".elements"
);
cardSection.renderItems(items);
})

.catch(err => console.error("Error al cargar tarjetas:", err));


//Popup del modal en pantalla completa

const handleCardClickWithPopup = (name, link) => {
  handleCardClick (name, link, imagePopup);
};

const imagePopup = new PopupWithImage(".display__container", ".display__frame");
imagePopup.setEventListeners();


// Crear tarjetas nuevas con clase Section + Card

const addImagePopup = new PopupWithForm(
  ".popupImg",
  ".popupImg__form",
  (formValues) => {
    addImagePopup.renderLoading(true);
    api.addCard({
      name: formValues.title,
      link: formValues.url
    })
    .then((res) => {
    const newCard = new Card(res.name, res.link, ".template", handleCardClickWithPopup, res.isLiked, handleDeleteCard, res._id, api).generateCard();
    cardSection.addItem(newCard);
    addImagePopup.close();
    })
    .catch((err) => {
     console.log(err);
   })
    .finally(() => {
        addImagePopup.renderLoading(false);
      });

    });

addImagePopup.setEventListeners();

const addButton = document.querySelector(".profile__add-button");

addButton.addEventListener("click", () => {
  addImagePopup.open();
});

// Información del usuario

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__role"
});

const profilePopup = new PopupWithForm(
  ".popup",
  ".popup__form",
  (formValues) => {
    profilePopup.renderLoading(true);
    api.updateUserInfo({
      name: formValues.nombre,
      about: formValues.acerca
    })
    .then((res) => {
userInfo.setUserInfo({
      name: res.name,
      job: res.about
    });
    profilePopup.close();
    })
    .catch((err) => {
     console.log(err);
   })
    .finally(() => {
        profilePopup.renderLoading(false);
      });

  }
);

profilePopup.setEventListeners();

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  document.querySelector("#name-input").value = currentUser.name;
  document.querySelector("#about-input").value = currentUser.job;

  profilePopup.open();
});

//Popup confirmación de borrar

const confirmationPopup = new PopupWithConfirmation(".popupDelete");
confirmationPopup.setEventListeners();

const handleDeleteCard = (cardId, cardElement) => {
  confirmationPopup.setSubmitAction(() => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        confirmationPopup.close();
      })
      .catch(err => console.error("Error al eliminar tarjeta:", err));
  });

  confirmationPopup.open();
};

//Popup avatar

const popupAvatar = new PopupWithForm(
  '.popup__avatar',
  '.popup__form',
  (formValues) => {
        popupAvatar.renderLoading(true);
    api.setUserAvatar({ avatar: formValues.url })
      .then((res) => {
        document.querySelector('.profile__image').src = res.avatar;
        popupAvatar.close();
      })
      .catch((err) => {
        console.error('Error al actualizar avatar:', err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  }
);

popupAvatar.setEventListeners();

const editAvatarIcon = document.querySelector('.profile__editButton');

editAvatarIcon.addEventListener('click', () => {
  popupAvatar.open();
});

// Validación de formularios con clase FormValidator
const forms = document.querySelectorAll(".popup__form");
forms.forEach(form => {
  const validator = new FormValidator({
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  }, form);
  validator.enableValidation();
});

//Activar los eventos de los popups
enableListener();





