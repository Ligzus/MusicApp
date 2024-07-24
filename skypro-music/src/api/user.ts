const USER_API_URL = "https://webdev-music-003b5b991590.herokuapp.com/user";

// Зарегистрироваться
export async function registerUser(
  email: string,
  password: string,
  username: string,
) {
  const res = await fetch(USER_API_URL + "/signup/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      username,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    alert("Ошибка регистрации, проверьте фармат email и надежность пароля");
  }

  return res.json();
}

// Войти
export async function loginUser(email: string, password: string) {
  const res = await fetch(USER_API_URL + "/login/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    alert("Такого пользователя нет");
  }

  return res.json();
}

// Обновить токен
export async function refreshToken(
  refresh: string | null
) {
  const res = await fetch(USER_API_URL + "/token/refresh/", {
    method: "POST",
    body: JSON.stringify({
      refresh,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка обновления токена");
  }

  return res.json();
}

// Получить токен
export async function getToken(email: string, password: string) {
  const res = await fetch(USER_API_URL + "/token/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка получения токена");
  }

  return res.json();
}
