class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _getHeaders(token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(token),
    }).then(res => this._checkResponse(res));
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(token),
    }).then(res => this._checkResponse(res));
  }

  updateUserInfo(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(token),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  setUserAvatar(data, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(token),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  addCard(data, token) {
    console.log("Datos que React manda a la API:", data);
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(token),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(token),
    }).then(this._checkResponse);
  }

  likeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(token),
    }).then(this._checkResponse);
  }

  unlikeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(token),
    }).then(this._checkResponse);
  }
}

const BASE_URL = import.meta.env.MODE === "production"
? "https://api.narayan-around.mooo.com"
: "http://localhost:3000";

const api = new Api({
  baseUrl: BASE_URL,
});

export default api;