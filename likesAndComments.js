// import { butCom, likeComment } from "./main.js";
export function likeEnt() {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((likeButton, index) => {
    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      likeComment(index);
      renderComments();
    });
  });
}

export function commentEnt() {
  const commentButton = document.querySelectorAll(".comment-text");
  commentButton.forEach((comBut, index) => {
    comBut.addEventListener("click", (event) => {
      event.stopPropagation();
      butCom(index);
      renderComments();
    });
  });
}
