import { login, setToken, setName } from "./api.js";

export const renderLogin = ({ fetchAndRenderComments }) => {
  // const appElement = document.getElementById("app");
  const appElement = document.querySelector(".container");
  const loginHtml = ` <div class="add-form">
      <h3 class="form-title">Форма входа</h3>
      <div class="form-row">
        <input type="text" id="login-input" 
        class="add-form-name-form"  placeholder="Логин" />
        <input
          type="text"
          id="password-input"
          class="add-form-text-form"
         
          placeholder="Пароль"
        />
      </div>
      <br />
      <button class="button" id="login-button">Войти</button>
       
    </div>`;
  // <a href="index.html" id="link-to-tasks">Зарегистрироваться</a>
  appElement.innerHTML = loginHtml;

  const buttonElement = document.getElementById("login-button");
  const loginInputElement = document.getElementById("login-input");
  const passwordInputElement = document.getElementById("password-input");

  buttonElement.addEventListener("click", () => {
    const addCorrectColor = () => {
      if (loginInputElement.value === "" && passwordInputElement.value === "") {
        buttonElement.style.backgroundColor = "grey";
        loginInputElement.style.backgroundColor = "#FFB6C1";
        passwordInputElement.style.backgroundColor = "#FFB6C1";
        alert("Введите логин и пароль");
        return;
      } else if (loginInputElement.value === "") {
        loginInputElement.style.backgroundColor = "#FFB6C1";
        buttonElement.style.backgroundColor = "";
        return;
      } else if (passwordInputElement.value === "") {
        passwordInputElement.style.backgroundColor = "#FFB6C1";
        buttonElement.style.backgroundColor = "";
        return;
      }
      buttonElement.disabled = true;
      buttonElement.textContent = "Элемент добавляется.....";
      login({
        login: loginInputElement.value,
        password: passwordInputElement.value,
      })
        .then((responseData) => {
          // console.log(getToken());
          // Если будет всё плохо-раскоментить
          setToken(responseData.user.token);
          setName(responseData.user.name);
          // console.log(responseData);
        })
        .then(() => {
          buttonElement.disabled = true;
          buttonElement.textContent = "Загружаюсь.....";
        })
        .then(() => {
          fetchAndRenderComments();
        })
        .then(() => {
          buttonElement.disabled = false;
          buttonElement.textContent = "Войти";
          loginInputElement.style.backgroundColor = "";
          passwordInputElement.style.backgroundColor = "";
          loginInputElement.value = "";
          passwordInputElement.value = "";
        })
        .catch((error) => {
          buttonElement.disabled = false;
          buttonElement.textContent = "Добавить";
          loginInputElement.style.backgroundColor = "#FFB6C1";
          passwordInputElement.style.backgroundColor = "#FFB6C1";
          if (
            error.message ===
            "Имя и комментарий должны быть не короче 3 символов"
          ) {
            alert("Неверный логин или Пароль");
          } else if (error.message === "Сервер сломался, попробуй позже") {
            alert("Сервер сломался, попробуй позже");
          } else {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
          }
        });
    };
    addCorrectColor();
  });
};
