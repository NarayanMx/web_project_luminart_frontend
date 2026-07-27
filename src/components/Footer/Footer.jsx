  import React from "react";
  import { Link } from "react-router-dom"; // Por si quieres enlazar internamente al About o Watchlist

  function Footer() {
  
    const currentYear = 2026; 

    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };

    return (
      <footer className="footer">
        <div className="footer__container">
          <p className="footer__copyright">
            &copy; {currentYear} Luminart. El arte que ilumina.
          </p>
          
          <nav className="footer__nav">
            <ul className="footer__links">
              <li className="footer__item">
                <a 
                  href="https://metmuseum.org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer__link"
                >
                  The MET API
                </a>
              </li>
              <li className="footer__item">
                <Link to="/" className="footer__link" onClick={handleScrollToTop}>Inicio</Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    );
  }

  export default Footer;