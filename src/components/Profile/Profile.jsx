import React from "react";
import Card from "../Card/Card.jsx";

function Profile({ email, savedArtworks, onCardSave, saveArtIds, onOpenPopup }) {
  return (
    <section className="profile">
      <div className="profile__info-container">
        <h2 className="profile__title">Tu Galería Personal</h2>
        <p className="profile__subtitle">Colección curada por: <span className="profile__email">{email}</span>
        </p>
        <div className="profile__stats">
          <span className="profile__stat-count">{savedArtworks.length}</span>
          <p className="profile__stat-label">obras inspirando al curador</p>
        </div>
      </div>

      <div className="profile__collection">
        {savedArtworks.length === 0 ? (
          <div className="profile__empty-state">
            <p className="profile__empty-text">Aún no has guardado ninguna obra en tu colección personal.</p>
            <p className="profile__empty-hint">Explora la galería principal e ilumina tu mente.</p>
          </div>
        ) : ( 
          <ul className="artworks__list">
            {savedArtworks.map((art) => (
              <Card
               key={art.id}
               card={art}
               handleOpenPopup={onOpenPopup}
               onCardSave={onCardSave}
               saveArtIds={saveArtIds}
               />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Profile;