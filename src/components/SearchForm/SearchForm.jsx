import React, {useState } from "react";

function SearchForm({ onSearchSubmit, searchError }) {
  const [keyword, setKeyword] = useState("");
  const [inputError, setInputError] = useState("");

  const handleChange= (e) => {
    setKeyword(e.target.value);
    if (inputError) setInputError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setInputError("Por favor, introduce una palabra (ej. Bosco, Monet, Gold)");
      return;
    }

    onSearchSubmit(keyword);
  };

  return (
    <section className="search">
      <div className="search__container">
        <h2 className="search__title">Encuentra la luz en el arte</h2>
        <p className="search__subtitle">Explora la complejidad humana a través del archivo del MET.</p>

        <form className="search__form" onSubmit={handleSubmit} noValidate>
          <div className="search__input-wrapper">
            <input 
              type="text"
              className="search__input"
              placeholder="Introduce un artista, periodo, cultura..."
              value={keyword}
              onChange={handleChange}
              required
            />

            {(inputError || searchError) && (
              <span className="search__error-message">
                {inputError || searchError}
              </span>
            )} 
          </div>
          <button type="submit" className="search__button">
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchForm;