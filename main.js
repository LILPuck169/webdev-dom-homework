import { getDate, sendDate } from "./api.js";
import { renderLogin } from "./loginPage.js";
import { renderComments } from "./renderComments.js";
import { format } from "date-fns";
//Функция fetchAndRenderComments
export const fetchAndRenderComments = () => {
  getDate().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      // const date = new Date(comment.date);
      const date = format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss");
      return {
        name: comment.author.name,
        date: date.toLocaleString(),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });
    comments = appComments;
    // const loaderID = document.getElementById("loaderID");
    // loaderID.style.display = "none";
    renderComments({ comments, fetchAndRenderComments });
    // renderLogin({ fetchAndRenderComments });
  });
  //     .then(() => {
  //       renderComments();
  //     });
};
//Конец Функция fetchAndRenderComments

let name;
export let comments = [];
// -active-like"

//Функция для комменатрия
export const butCom = (index) => {
  let commentInput = document.getElementById("commintInput");
  const comment = comments[index];
  commentInput.value = `${comment.text},${comment.name}`;
};

//DoneThis
export const likeComment = (index) => {
  const comment = comments[index];
  if (comment.isLike) {
    comment.likes--;
    comment.isLike = false;
  } else {
    comment.likes++;
    comment.isLike = true;
  }
};

//Функция для disabledName
export const disblName = (index) => {
  let disN = document.getElementById("nameInput");
  const comment = comments[index];
  disN.value = `${comment.name}`;
  disN.disabled = true;
};

fetchAndRenderComments();
