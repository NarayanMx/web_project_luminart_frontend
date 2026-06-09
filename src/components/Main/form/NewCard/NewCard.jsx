import { useContext, useState } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";


export default function NewCard() {

    const handleSubmit = (e) => {
    e.preventDefault();

    const cardData = {
      name: title,
      link: url
    };

    handleAddPlaceSubmit(cardData);

    setTitle("");
    setUrl("");
    };

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const { handleAddPlaceSubmit } = useContext(CurrentUserContext);


return (

  <form className="popupImg__form popup__form" onSubmit={handleSubmit}>

    <label className="popupImg__field">
      <input
        type="text"
        name="title"
        placeholder="Título"
        className="popupImg__ttl popup__input"
        minLength="2"
        maxLength="30"
        id="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <span className="popup__input-error" id="title-input-error"></span>
    </label>

    <label className="popupImg__field">
      <input
        type="url"
        name="url"
        placeholder="Enlace a la imagen"
        className="popupImg__url popup__input"
        id="url-input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <span className="popup__input-error" id="url-input-error"></span>
    </label>

  <button type="submit" className="popupImg__save-button popup__button">Guardar</button>
  </form>
);
}