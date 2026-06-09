import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../images/Logo_white.png";

function Header({ email, loggedIn, onLogOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img
        src={logo}
        alt="Logo del proyecto Around US"
        className="header__logo"
      />

      {location.pathname === "/" && loggedIn && (
        <div className="header__user">
          <span className="header__email">{email}</span>
          <button className="header__logout" onClick={onLogOut}>
            Cerrar sesión
          </button>
        </div>
      )}

      {location.pathname === "/signin" && (
        <nav className="header__nav">
          <Link to="/signup" className="header__link">
            Registrarse
          </Link>
        </nav>
      )}

      {location.pathname === "/signup" && (
        <nav className="header__nav">
          <Link to="/signin" className="header__link">
            Iniciar Sesión
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;