import React from "react";
import Card from "../Card/Card.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Preloader from "../Preloader/Preloader.jsx";  

function Main({ 
  artworks, 
  onSearchSubmit, 
  searchError, 
  isLoading, 
  hasMore, 
  onShowMore, 
  onCardSave, 
  saveArtIds, 
  onOpenPopup 
}) {
  
  return (
    <main className="main-content">

      <SearchForm onSearchSubmit={onSearchSubmit} searchError={searchError} />


      {isLoading && artworks.length === 0 && <Preloader />}


      {artworks.length > 0 && (
        <section className="artworks">
          <ul className="artworks__list">
            {artworks.map((art) => (
              <Card 
                key={art.id}
                card={art} 
                handleOpenPopup={onOpenPopup}
                onCardSave={onCardSave}
                saveArtIds={saveArtIds}
              />
            ))}
          </ul>

          {hasMore && (
            <div className="artworks__more-container">
              <button 
                type="button" 
                className="artworks__more-button" 
                onClick={onShowMore}
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Mostrar más"}
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default Main;