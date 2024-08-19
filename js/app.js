// 1. select #message and change innerText to “X” turn
const message = document.getElementById("message");
message.innerText = "X";

let gameBoard = {};
const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

let moves = 0;

// 2. assign a addEventListener to each sqr, event type “click”, all 9 sqrs using the same callback func, pass in e.target.innerText
const squares = document.querySelectorAll(".sqr")

function handleClick(e) {

    // 3. in the onclick listener callback, check if the sqr has been occupied, if true, return, else change innertext content
    // 4. change innertext content to message.innertext
    const square = e.target;

    if (square.innerText === "") {
        square.innerText = message.innerText;
        gameBoard[square.id] = square.innerText;
        moves++;
        const isOver = isGameOver();

        if (isOver) {
            if (message.innerText.includes("XO draw!")) {
                return;
            }
            message.innerText = square.innerText + " wins!"
        } else {
            toggleTurn();
        }


    } else {
        return;
    }

    // 5. in  eventlistener callback, check if game is over, create a func to do this it should be in global, this func return a boolean value indicating whether the game is over

}

squares.forEach((square) => square.addEventListener("click", handleClick))

// 6. if game is over, show winner in #message, and return. Otherwise, do toggleturn func (Do this at last)
function isGameOver() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [first, second, third] = winningConditions[i];

        if (gameBoard[first] && gameBoard[first] === gameBoard[second] && gameBoard[second] === gameBoard[third]) {
            return true;
        }
    }

    // tie
    if (moves >= 9) {
        message.innerText = "XO draw!"
        return true;
    }

    return false;
}

// 7. In global, create a toggleTurn func, no param, check if message.innerText === “X”, overwrite it with “O”, vice versa. In the onclick listener callback, call this toggleTurn func if sqr is available
function toggleTurn() {
    if (message.innerText === "X") {
        message.innerText = "O"
    } else {
        message.innerText = "X"
    }
}

//8. Add a “Reset Game” btn at the end of <body>, addEventListener, “click” event, callback func. query select all the sqrs and set their innertext = “”, and change #message innerText to “X” turn
const resetButton = document.createElement("button");

resetButton.innerText = "Restart Game";
resetButton.style.backgroundColor = "black";
resetButton.style.color = "gainsboro";
resetButton.style.marginTop = "12px";

document.body.appendChild(resetButton);

function handleResetBtnClick() {
    squares.forEach((square) => {
        square.innerText = "";
    });

    message.innerText = "X";
    gameBoard = {};
    moves = 0;
}

resetButton.addEventListener("click", handleResetBtnClick)