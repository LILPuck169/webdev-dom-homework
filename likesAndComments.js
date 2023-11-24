import { getToken } from "./api.js";
import {
  butCom,
  likeComment,
  comments,
  fetchAndRenderComments,
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
        alert("Нузно авторизоваться")
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
