import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ email, loggedIn, onLogOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <h1 className="header__title">LUMINART</h1>
      </Link>

      <nav className="header__nav">
        {loggedIn && (
          <div className="header__user-zone">
            <span className="header__email">{email}</span>
            {location.pathname === "/" ? (
              <Link to="/coleccion" className="header__link header__link_type_watchlist">
                Mi Colección
              </Link>
            ) : (
              <Link to="/" className="header__link">
                Galería
              </Link>
            )}
            <button className="header__logout-button" onClick={onLogOut}>
              Cerrar sesión
            </button>
          </div>
        )}

        {!loggedIn && location.pathname === "/signin" && (
          <Link to="/signup" className="header__link">
            Registrarse
          </Link>
        )}

        {!loggedIn && location.pathname === "/signup" && (
          <Link to="/signin" className="header__link">
            Iniciar Sesión
          </Link>
        )}
        
        {!loggedIn && location.pathname === "/" && (
          <Link to="/signin" className="header__link">
            Iniciar Sesión
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;