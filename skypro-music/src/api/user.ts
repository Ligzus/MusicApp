import { use } from "react";

const USER_API_URL = "https://skypro-music-api.skyeng.tech/user";

// Зарегистрироваться
export async function signUp(
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

  return res.json();
}

// Войти
export async function login() {
  const res = await fetch(USER_API_URL + "/login/", {
    method: "POST",
    body: JSON.stringify({
      email: "",
      password: "",
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  return res.json();
}

//Обновить токен
export async function getNewToken(refresh: string) {
  const res = await fetch(USER_API_URL + "/token/refresh/", {
    method: "POST",
    body: JSON.stringify({
      refresh,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

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

  return res.json();
}
