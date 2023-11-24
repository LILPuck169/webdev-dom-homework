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

fetchAndRenderComments();
// renderLogin({ fetchAndRenderComments });
// renderComments({ comments });

// renderComments();

//Логика, которая отрабатывает после того, когда нажимается кнопки!
// const input = document.getElementById("nameInput");
// const button = document.getElementById("button");
// const textArea = document.getElementById("commintInput");
// function addComment() {
//   const textArea = document.getElementById("commintInput");
//   const ul = document.getElementById("ul");
//   button.style.backgroundColor = "";
//   input.style.backgroundColor = "";
//   textArea.style.backgroundColor = "";

//   if (input.value === "" && textArea.value === "") {
//     button.style.backgroundColor = "grey";
//     input.style.backgroundColor = "#FFB6C1";
//     textArea.style.backgroundColor = "#FFB6C1";
//     return;
//   } else if (input.value === "") {
//     input.style.backgroundColor = "#FFB6C1";
//     return;
//   } else if (textArea.value === "") {
//     textArea.style.backgroundColor = "#FFB6C1";
//     return;
//   }

//   let currentDate = new Date();
//   let day = currentDate.getDate();
//   let month = currentDate.getMonth() + 1;
//   let year = currentDate.getFullYear();
//   let hours = currentDate.getHours();
//   let minutes = currentDate.getMinutes();
//   if (day < 10) {
//     day = "0" + day;
//   }
//   if (month < 10) {
//     month = "0" + month;
//   }
//   if (hours < 10) {
//     hours = "0" + hours;
//   }
//   if (minutes < 10) {
//     minutes = "0" + minutes;
//   }
//   let formattedDate =
//     day + "." + month + "." + year + " " + hours + ":" + minutes;

//   input.value = "";
//   textArea.value = "";

//   //Нужно писать тут!
// }
