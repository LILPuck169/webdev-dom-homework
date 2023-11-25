import { getToken } from "./api.js";
import {
  butCom,
  likeComment,
  comments,
  fetchAndRenderComments,
  disblName,
} from "./main.js";
import { renderComments } from "./renderComments.js";

export function likeEnt() {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((likeButton, index) => {
    likeButton.addEventListener("click", (event) => {
      if (getToken()) {
        event.stopPropagation();
        likeComment(index);
        renderComments({ comments, fetchAndRenderComments });
      } else {
        alert("Нужно авторизоваться....");
      }
    });
  });
}

export function commentEnt() {
  const commentButton = document.querySelectorAll(".comment-text");
  commentButton.forEach((comBut, index) => {
    comBut.addEventListener("click", (event) => {
      event.stopPropagation();
      butCom(index);
      renderComments({ comments, fetchAndRenderComments });
    });
  });
}

export function disabledName() {
  const disableNam = document.querySelectorAll(".commentName");
  disableNam.forEach((index) => {
    // if (getToken()) {
    // }
    disblName(index);
    renderComments({ comments, fetchAndRenderComments });
  });
}
