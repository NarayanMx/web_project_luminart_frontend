import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import api from "../utils/api.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./Login/Login.jsx";
import auth from "../utils/auth.js";
import Register from "./Register/Register.jsx"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import Popup from "./Main/Popup/Popup.jsx";
import InfoTooltip from "./InfoToolTip/InfoToolTip.jsx";

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cards, setCards] = useState([])
  const navigate = useNavigate();

const handleRegister = (email, password) => {
  auth.signup(email, password)
    .then((newUser) => {
   setEmail(newUser.email);
   setIsInfoTooltipOpen(true);
   setIsSuccess(true);      
    })
    .catch((error) => {
  console.error("Error al registrar el usuario:", error);
    setIsInfoTooltipOpen(true);
    setIsSuccess(false); 
    });
};

    useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        navigate("/signin"); 
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [isSuccess, navigate]);





const handleLogin = (email, password) => {
  auth.signin(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        return auth.getUserData(data.token);
      }
    })
    .then((userData) => {
      setEmail(userData.email);
      navigate("/");
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error);
      setIsInfoTooltipOpen(true);
      setIsSuccess(false);
    });
};


const closeInfoTooltip = () => {
  setIsInfoTooltipOpen(false);


  if (isSuccess) {
    navigate("/signin");
  }

  setIsSuccess(null); 
};


useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (token) {
    auth.getUserData(token)
      .then((userData) => {
        setEmail(userData.email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("Token inválido:", error);
        setLoggedIn(false);
      });
  }
}, [navigate]);

const handleLogout = () => {
  localStorage.removeItem("jwt");
  setLoggedIn(false);
  setEmail('');
  navigate("/signin");
};


//Cargar la app con token +info del usuario y tarjetas
useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (token) {
    api.getUserInfo(token)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error("Error al obtener información del usuario:", error);
      });

    api.getInitialCards(token)
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.error("Error al obtener las tarjetas:", error);
      });
  }
}, [loggedIn]);



const handleOpenPopup = (popup) => {
  setPopup(popup);
};

const handleClosePopup = () => {
  setPopup(null);
};

const handleUpdateUser = (data) => {
  const token = localStorage.getItem("jwt");
  api.updateUserInfo(data, token)
    .then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    })
    .catch((error) => {
      console.error("Error al actualizar usuario:", error);
    });
};


const handleUpdateAvatar = (data) => {
  const token = localStorage.getItem("jwt");
  api.setUserAvatar(data, token)
    .then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    })
    .catch((error) => console.error(error));
};


const handleCardLike = (card) => {
  const token = localStorage.getItem("jwt");

  const isLiked = card.likes && card.likes.some((id) => id === currentUser._id);

  const apiMethod = isLiked
  ? api.unlikeCard(card._id, token)
  : api.likeCard(card._id, token);

  apiMethod
  .then((updateCard) => {
    setCards((state) =>
    state.map((currentCard)=>
    currentCard._id === card._id ? updateCard : currentCard
    )
  );
  })
  .catch((error) => {
    console.error("Error al cambiar el like :(", error);
  });
};    


/*
const handleCardLike = (card) => {
  const token = localStorage.getItem("jwt");
  const apiMethod = card.isLiked
    ? api.unlikeCard(card._id, token)
    : api.likeCard(card._id, token);

  apiMethod
    .then((updatedCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? updatedCard : currentCard
        )
      );
    })
    .catch((error) => {
      console.error("Error al cambiar el like:", error);
    });
};
*/


async function handleCardDelete(card) {
const token = localStorage.getItem("jwt");
await api.deleteCard(card._id, token)
.then(() => {
setCards((state) =>
  state.filter((currentCard) => currentCard._id !== card._id)
);
})
.catch((error) => console.error(error));
}


const handleAddPlaceSubmit = (cardData) => {
  const token = localStorage.getItem("jwt");
  api.addCard(cardData, token)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      handleClosePopup();
    })
    .catch((error) => {
      console.error("Error al agregar tarjeta:", error);
    });
};






  return (
  <div className="page">
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar, handleAddPlaceSubmit }}
    >
      {/* Header siempre visible */}
      <Header email={email} loggedIn={loggedIn} onLogOut={handleLogout} />

      <Routes>
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Register onRegister={handleRegister} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>

      {isInfoTooltipOpen && (
        <Popup onClose={closeInfoTooltip}>
          <InfoTooltip isSuccess={isSuccess} />
        </Popup>
      )}
    </CurrentUserContext.Provider>
  </div>

    );
  }

export default App;
