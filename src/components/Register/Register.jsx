import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <div className="register">
      <div className="register__container">
        <h2 className="register__title">Únete a Luminart</h2>
        <p className="register__subtitle">Crea tu espacio personal para coleccionar obras maestras</p>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
          type="email"
          className="register__input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          />

          <input 
          type="password"
          className="register__input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
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
    </div>
  );
}

export default Register;