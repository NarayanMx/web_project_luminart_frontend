import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditAvatar() {

    const { handleUpdateAvatar } = useContext(CurrentUserContext);

    const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateAvatar({
      avatar:avatarRef.current.value
    });
    };

    const avatarRef = useRef();

return (

  <form className="popupImg__form popup__form" onSubmit={handleSubmit}>

    <label className="popupImg__field">
      <input
        ref={avatarRef}
        type="url"
        name="url"
        placeholder="Enlace a la imagen"
        className="popupImg__url popup__input"
        id="url-input"
        required
      />
      <span className="popup__input-error" id="url-input-error"></span>
    </label>

  <button type="submit" className="popupImg__save-button popup__button">Guardar</button>
  </form>
);
}