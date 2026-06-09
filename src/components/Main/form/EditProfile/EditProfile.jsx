import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile() {

  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name || "")
  const [description, setDescription] = useState(currentUser.about || "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about: description});
    };

return (

  <form className="popup__form" onSubmit={handleSubmit}>
    <label className="popup__field">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        className="popup__name popup__input"
        minLength="2"
        maxLength="40"
        id="name-input"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="popup__input-error" id="name-input-error"></span>
    </label>

    <label className="popup__field">
      <input
        type="text"
        name="acerca"
        placeholder="Acerca de mí"
        className="popup__acerca popup__input"
        minLength="2"
        maxLength="200"
        id="about-input"
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      <span className="popup__input-error" id="about-input-error"></span>
    </label>

  <button type="submit" className="popup__save-button popup__button">Guardar</button>
  </form>
);
}