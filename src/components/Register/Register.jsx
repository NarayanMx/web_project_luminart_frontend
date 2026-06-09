import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
    console.log("Datos del formulario:", { email, password });
  };

  return (
    <div className="register">
      <h2 className="register__title">Regístrate</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="register__input"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="register__input"
          required
        />
        <button type="submit" className="register__button">
          Registrarse
        </button>
      </form>

       <p className="register__text">
        ¿Ya eres miembro?{" "}
        <Link to="/signin" className="register__link">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  );
}

export default Register;