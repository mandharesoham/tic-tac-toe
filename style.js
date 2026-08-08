let boxes = document.querySelectorAll(".box");
let reset_Btn = document.querySelector("#reset_Btn");
let newGameBtn = document.querySelector("#new-Btn");
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector("#msg");

let turn0 = true; //player1 , player2

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const checkTie = () => {
  let filled = 0;

  boxes.forEach((box) => {
    if (box.innerText !== "") {
      filled++;
    }
  });

  if (filled === 9) {
    msg.innerText = "It's a Tie!";
    msgContainer.classList.remove("hide");
    disableBtn();
  }
};

function resetGame() {
  turn0 = true;
  enableBtn();
  msgContainer.classList.add("hide");
}
function disableBtn() {
  for (box of boxes) {
    box.disabled = true;
  }
}
function enableBtn() {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.color = "";
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box is clicked");
    if (turn0) {
      //player0
      box.innerText = "O";
      box.style.color = "#E98B50";

      turn0 = false;
    } else {
      //player1
      box.innerText = "X";
      box.style.color = "#F3CD97";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
    checkTie();
  });
});
function showWinner(winner) {
  msg.innerText = `Congratulation , winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBtn();
}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("winner ", pos1val);
        showWinner(pos1val);
        return true;
      }
    }
  }
  return false;
};
newGameBtn.addEventListener("click", resetGame);
reset_Btn.addEventListener("click", resetGame);
