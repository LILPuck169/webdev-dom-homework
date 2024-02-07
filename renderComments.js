import { getToken, sendDate, getName, setName } from "./api.js";
import { commentEnt, disabledName, likeEnt } from "./likesAndComments.js";
import { renderLogin } from "./loginPage.js";
const ulElements = document.getElementById("ul");
export const renderComments = ({ comments, fetchAndRenderComments }) => {
  const appElement = document.getElementById("app");
  const commentsHTML = comments
    .map((comment, index) => {
      return `<li class="comment" id ="comment" data-index="${index} ">
          <div class="comment-header">
          <div id="commentName">${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div  id="commentText" class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
          
           ${
             getToken()
               ? ` <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${
                comment.isLike ? "-active-like" : ""
              }" ></button>
            </div>`
               : `<div class="likes">
        <span class="likes-counter">${comment.likes}</span>
        <button class="like-button"></button>
      </div>`
           }
          </div>
        </li>`;
    })
    .join("");

  const appHtml = ` 
    <div class="container">
      <ul id="ul" class="comments">${commentsHTML}</ul>
      ${
        getToken()
          ? `<div id="form" class="add-form">
          <input
          value='${getName()}' disabled
          />
          <textarea
            id="commintInput"
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
          ></textarea>
          <div class="add-form-row">
            <button id="button" class="add-form-button">Написать</button>
          </div>
        </div>`
          : '<span class="auth-button">Авторизуйтесь!</span>'
      }
         </div>`;
  // ${!getToken() && `<span class="auth-button">Авторизуйтесь!</span>`}
  appElement.innerHTML = appHtml;
  const butAuth = document.querySelector(".auth-button");
  const input = document.getElementById("nameInput");
  const button = document.getElementById("button");
  const textArea = document.getElementById("commintInput");

  butAuth &&
    butAuth.addEventListener("click", () => {
      renderLogin({ fetchAndRenderComments });
    });

  // Кнопка (Написать по клику)
  button?.addEventListener("click", function () {
    const addEventClick = () => {
      if (textArea.value === "") {
        button.style.backgroundColor = "grey";
        textArea.style.backgroundColor = "#FFB6C1";
        setTimeout(() => {
          textArea.style.backgroundColor = ""; // Возвращаем к прежнему виду
          button.style.backgroundColor = "";
        }, 3000); // Ждем 3 секунды
        return;
      } else if (textArea.style.backgroundColor === "rgb(255, 182, 193)") {
        textArea.style.backgroundColor = "";
      }
      button.disabled = true;
      button.textContent = "Элемент добавляется.....";

      sendDate({
        text: textArea.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        forceError: true,
      })
        .then((responseData) => {
          button.disabled = true;
          button.textContent = "Загружаю список…";
        })
        .then(() => {
          return fetchAndRenderComments();
        })
        .then(() => {
          button.disabled = false;
          button.textContent = "Добавить";
          textArea.value = "";
        })
        .catch((error) => {
          button.disabled = false;
          button.textContent = "Добавить";
          textArea.style.backgroundColor = "#FFB6C1";
          if (
            error.message ===
            "Имя и комментарий должны быть не короче 3 символов"
          ) {
            alert("Имя и комментарий должны быть не короче 3 символов");
          } else if (error.message === "Сервер сломался, попробуй позже") {
            alert("Сервер сломался, попробуй позже");
          } else {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
          }
        });
      renderComments({ comments, fetchAndRenderComments });
    };
    addEventClick();
  });

  //Кнопка лайка
  disabledName();
  likeEnt();
  //Кнопка комментария
  commentEnt();
};
