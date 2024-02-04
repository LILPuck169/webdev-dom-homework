const host = "https://wedev-api.sky.pro/api/v2/anastasia-grigorenko/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login"; 

let token;
export const setToken = (newToken) => {
  token = newToken;
};
//Привет
export const getToken = () => {
  return token;
}; 


//Реализация с именем
let userName;
export const setName = (newName) => {
  userName = newName;
};
export const getName = () => {
  console.log(userName);
  return userName;
};
//Конец реализации с именем

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


