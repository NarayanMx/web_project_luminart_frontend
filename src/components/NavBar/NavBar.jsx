import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavBar({ email, loggedIn, onLogOut }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      {loggedIn ? (
        <div className="navbar__user-zone">
          <span className="navbar__email">{email}</span>

          {location.pathname === "/" ? (
            <Link to="/coleccion" className="navbar__link navbar__link_type_collection">
              Mi Colección
            </Link>
          ) : (
            <Link to="/" className="navbar__link">
              Galería
            </Link>            
          )}

          <button type="button" className="navbar__logout-button" onClick={onLogOut}>
            Cerrar sesión
          </button>
        </div>
      ) : ( 
        <div className="navbar__auth-zone">
          {location.pathname === "/signin" && (
            <Link to="/signup" className="navbar__link">
              Registrarse
            </Link>
          )}

          {location.pathname === "/signup" && (
            <Link to="/signin" className="navbar__link">
              Iniciar Sesión
            </Link>
          )}

          {location.pathname === "/" && (
            <Link to="/signin" className="navbar__link">
              Iniciar Sesión
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;