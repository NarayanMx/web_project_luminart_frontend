class Auth {
constructor(options){
this._baseUrl = options.baseUrl;
this._headers = options.headers;}

  _checkResponse(res) {
    if (res.ok) {
    return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
    }

  signup( email, password ) {
    return fetch(`${this._baseUrl}/signup`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
    email: email,
    password: password
    })
    })
    .then(res => this._checkResponse(res));
  }

  signin(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({
    email: email,
    password: password
    })
    })
    .then(res => this._checkResponse(res));
  }

  getUserData(token) {
  return fetch(`${this._baseUrl}/users/me`, {
    method: "GET",
    headers: {
      ...this._headers,
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => this._checkResponse(res));
}

}

const BASE_URL = import.meta.env.MODE === "production"
? "https://api.narayan-around.mooo.com"
: "http://localhost:3000";



const auth = new Auth({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default auth;