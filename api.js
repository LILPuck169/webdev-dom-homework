const host = "https://wedev-api.sky.pro/api/v2/yaroslav-olshanskiy/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";

let token;
export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => {
  return token;
};



export function getDate() {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}

export function sendDate({ name, date, text, likes, isLike }) {
  return fetch(host, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      date: date,
      text: text,
      likes: likes,
      isLike: isLike,
    }),
  }).then((response) => {
    if (response.status <= 201) {
      return response.json();
    } else if (response.status === 400) {
      throw new Error("Имя и комментарий должны быть не короче 3 символов");
    } else if (response.status === 500) {
      throw new Error("Сервер сломался, попробуй позже");
    }
  });
}

export function login({ login, password }) {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status <= 201) {
      return response.json();
    } else if (response.status === 400) {
      throw new Error("Имя и комментарий должны быть не короче 3 символов");
    } else if (response.status === 500) {
      throw new Error("Сервер сломался, попробуй позже");
    }
  });
}

//"https://wedev-api.sky.pro/api/v1/yaroslav-olshanskiy/comments" (GET)
//"https://wedev-api.sky.pro/api/v1/yaroslav-olshanskiy/comments"(POST)
