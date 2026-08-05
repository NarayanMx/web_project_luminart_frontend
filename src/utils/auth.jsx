const USER_KEY = "luminart_user";
const TOKEN_KEY = "luminart_token";

const handleAuthResponse = (success, data, errorMessage) => {
  if (success) {
    return Promise.resolve(data);
  }
    return Promise.reject(errorMessage);
};

export const register = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        return reject("El correo y la contraseña son obligatorios");
      }

      const newUser ={ email, password};
      localStorage.setItem(USER_KEY, JSON.stringify(newUser));

      resolve({
        message: "Registro exitoso",
        data: { email },
      });
    }, 500);
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storedUserRaw = localStorage.getItem(USER_KEY);

      if (!storedUserRaw) {
        return reject("No existe ninguna cuenta registrada con ese correo");
      }

      const storedUser = JSON.parse(storedUserRaw);

      if (storedUser.email !== email || storedUser.password !== password) {
        return reject("Correo o contraseña incorrectos");
      }

      const fakeToken = `jwt_token_${btoa(email)}_${Date.now()}`;
      localStorage.setItem(TOKEN_KEY, fakeToken);

      resolve({
        token: fakeToken,
        user: { email: storedUser.email },
      });
    }, 500);
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUserRaw = localStorage.getItem(USER_KEY);

      if (token && token === storedToken && storedUserRaw) {
        const storedUser = JSON.parse(storedUserRaw);
        return resolve({
          data: { email: storedUser.email },
        });
      }
      return reject("Token inválido o expirado");
    }, 300);
  });
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};