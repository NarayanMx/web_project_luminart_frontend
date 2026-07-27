import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Card from "./components/Card/Card.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Main from "./components/Main/Main.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Preloader from "./components/Preloader/Preloader.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import SearchForm from "./components/SearchForm/SearchForm.jsx";
import ImagePopup from "./components/ImagePopup/ImagePopup.jsx";

import metApi from "./utils/api.jsx";
import * as auth from "./utils/auth.jsx";
import { CurrentUserContext } from "./contexts/CurrentUserContext.js";

function ProtectedRoute({ loggedIn, children }) {
  return loggedIn ? children : <Navigate to="/signin" replace/>;
}

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({ email: ""});
  const [loggedIn, setLoggedIn] = useState(false);
  
  const [ artworks, setArtworks] = useState([]);
  const [savedArtworks, setSavedArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");

  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("luminart_token");
    if (token) {
      auth
      .checkToken(token)
      .then((res) => {
        if (res && res.data) {
          setLoggedIn(true);
          setCurrentUser({ email: res.data.email });
        }
      })
      .catch((err) => console.error("Sesión expirada o inválida:", err));
    }

    const storedSavedArt = localStorage.getItem("luminart_saved_art");
    if (storedSavedArt) {
      try {
        setSavedArtworks(JSON.parse(storedSavedArt));
      } catch (e) {
        console.error("Error leyendo colección de localStorage", e);
      }
    }
  }, []);


  useEffect(() => {
    setIsLoading(true);
    metApi
    .getRandomArtworks(6)
    .then((initialCards) => {
      setArtworks(initialCards);
    })
    .catch((err) => {
      console.error("Error al cargar obras iniciales:", err);
      setSearchError("No se pudieron cargar las obras de la galería inicial");
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleSearchSubmit = (keyword) => {
    setIsLoading(true);
    setSearchError("");
    setCurrentKeyword(keyword);

    metApi
    .searchAndFetchArtworks(keyword)
    .then((artList) => {
      setArtworks(artList);
      if (artList.length === 0) {
        setSearchError("No se encontraron obras para esta búsqueda");
      }
    })
    .catch((err) => {
      console.error("Error al consultar el MET:", err);
      setSearchError("Ocurrió un error al conectar con el servidor del museo");
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const handleCardSave = (art) => {
    const isSaved = savedArtworks.some((item) => item.id === art.id);
    let updatedCollection;

    if (isSaved) {
      updatedCollection = savedArtworks.filter((item) => item.id !== art.id);
    } else {
      updatedCollection = [art, ...savedArtworks];
    }

    setSavedArtworks(updatedCollection);
    localStorage.setItem("luminart_saved_art", JSON.stringify(updatedCollection));
  };
  
  
  const handleRegister = (email, password) => {
    auth.register(email, password)
    .then(() => {
      navigate("/signin");
    })
    .catch((err) => alert(err));
  };

  const handleLogin = (email, password) => {
    auth
    .login(email, password)
    .then((res) => {
      if (res.token) {
        setLoggedIn(true);
        setCurrentUser({ email: res.user.email });
        navigate("/");
      }
    })
    .catch((err) => alert(err));
  };

  const handleLogOut = () => {
    auth.logout();
    setLoggedIn(false);
    setCurrentUser({ email: "" });
    navigate ("/signin");
  };

  const handleShowMore = () => {
    setIsLoading(true);

    const fetchMorePromise = currentKeyword
      ? metApi.searchAndFetchArtworks(currentKeyword, artworks.length + 6)
      : metApi.getRandomArtworks(6);

    fetchMorePromise
      .then((newCards) => {
        setArtworks((prevArtworks) => {
          const existingIds = new Set(prevArtworks.map((art) => art.id));
          const filteredNewCards = newCards.filter((art) => !existingIds.has(art.id));
          return [...prevArtworks, ...filteredNewCards];
        });
      })
      .catch((err) => {
        console.error("Error al cargar más obras:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveArtIds = savedArtworks.map((art) => art.id);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={currentUser.email} loggedIn={loggedIn} onLogOut={handleLogOut} />

        <main className="content">
          <Routes>

            <Route
              path="/"
              element={<Main
                        artworks={artworks}
                        onSearchSubmit={handleSearchSubmit}
                        isLoading={isLoading}
                        hasMore={artworks.length > 0}
                        onShowMore={handleShowMore}
                        searchError={searchError}
                        onOpenPopup={setSelectedCard}
                        onCardSave={handleCardSave}
                        saveArtIds={saveArtIds}
                        />
              }
            />

            <Route
              path="/coleccion"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    email={currentUser.email}
                    savedArtworks={savedArtworks}
                    onCardSave={handleCardSave}
                    saveArtIds={saveArtIds}
                    onOpenPopup={setSelectedCard}
                    />
                </ProtectedRoute>
              }
            />

            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Register onRegister={handleRegister} />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>

        <Footer />

        <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;