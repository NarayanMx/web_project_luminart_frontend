import React from "react";

function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__image-container">
          <div className="about__avatar-placeholder">
            🎨
          </div>
        </div>

        <div className="about__content">
          <h2 className="about__title">Acerca del autor y Luminart</h2>
          <p className="about__paragraph">
            ¡Hola! Soy Narayan, el desarrollador detrás de **Luminart**, una aplicación web diseñada para explorar la riqueza cultural del Museo Metropolitano de Arte de Nueva York (The MET).
          </p>
          <p className="about__paragraph">
            Este proyecto fue construido utilizando React, React Router y CSS modular siguiendo la metodología BEM. Permite a los amantes del arte descubrir obras históricas, realizar búsquedas personalizadas y curar su propia colección privada.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;