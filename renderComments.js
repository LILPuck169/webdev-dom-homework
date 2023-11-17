import { sendDate } from "./api.js";
import { commentEnt, likeEnt } from "./likesAndComments.js";
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
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${
                comment.isLike ? "-active-like" : ""
              }" ></button>
            </div>
          </div>
        </li>`;
    })
    .join("");

  const appHtml = ` 
    <div class="container">
      <div id="loaderID">Нужно подождать чуть чуть....</div>
      <ul id="ul" class="comments">${commentsHTML}</ul>
      <div id="form" class="add-form">
        <input
          id="nameInput"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
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
      </div>
    </div>`;

  appElement.innerHTML = appHtml;
  const input = document.getElementById("nameInput");
  const button = document.getElementById("button");
  const textArea = document.getElementById("commintInput");
  // Кнопка (Написать по клику)
  button.addEventListener("click", function () {
    // addComment();
    // setupLikeButton();
    // addButtonLike();
    const addEventClick = () => {
      if (input.value === "" && textArea.value === "") {
        button.style.backgroundColor = "grey";
        input.style.backgroundColor = "#FFB6C1";
        textArea.style.backgroundColor = "#FFB6C1";
        return;
      } else if (input.value === "") {
        input.style.backgroundColor = "#FFB6C1";
        return;
      } else if (textArea.value === "") {
        textArea.style.backgroundColor = "#FFB6C1";
        return;
      }
      button.disabled = true;
      button.textContent = "Элемент добавляется.....";

      sendDate({
        name: input.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        date: addComment.formattedDate,
        text: textArea.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        likes: "0",
        isLike: false,
        forceError: true,
      })
        .then(() => {
          button.disabled = true;
          button.textContent = "Загружаю список…";
        })
        .then(() => {
          return fetchAndRenderComments();
        })
        .then((data) => {
          button.disabled = false;
          button.textContent = "Добавить";
          input.style.backgroundColor = "";
          textArea.style.backgroundColor = "";
          input.value = "";
          textArea.value = "";
        })
        .catch((error) => {
          // console.log(error.message);
          button.disabled = false;
          button.textContent = "Добавить";
          input.style.backgroundColor = "#FFB6C1";
          textArea.style.backgroundColor = "#FFB6C1";
          if (
            error.message ===
            "Имя и комментарий должны быть не короче 3 символов"
          ) {
            alert("Имя и комментарий должны быть не короче 3 символов");
          }

          if (error.message === "Сервер сломался, попробуй позже") {
            alert("Сервер сломался, попробуй позже");
          }
          if ((error.message = "Failed to fetch")) {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
          }
        });
      renderComments({ comments });
    };
    addEventClick();
  });

  //Кнопка лайка
  likeEnt({});
  //   const likeButtons = document.querySelectorAll(".like-button");
  //   likeButtons.forEach((likeButton, index) => {
  //     likeButton.addEventListener("click", (event) => {
  //       event.stopPropagation();
  //       likeComment(index);
  //       renderComments();
  //     });
  //   });

  //Кнопка комментария
  commentEnt({});
  //   const commentButton = document.querySelectorAll(".comment-text");
  //   commentButton.forEach((comBut, index) => {
  //     comBut.addEventListener("click", (event) => {
  //       event.stopPropagation();
  //       butCom(index);
  //       renderComments();
  //     });
  //   });
};
