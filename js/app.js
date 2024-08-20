// Requirements:
// Display an empty tic-tac-toe board when the page is initially displayed.
// A player can click on the nine cells to make a move.
// Every click will alternate between marking an X and O.
// Display whose turn it is (X or O).
// The cell cannot be played again once occupied with an X or O.
// Provide win logic and display a winning message.
// Provide logic for a cat’s game (tie), also displaying a message.
// Provide a Reset Game button that will clear the contents of the board.

//1) Define the required variables used to track the state of the game.
let board;
let turn;
let winner;
let tie;

//2) Store cached element references.
const squareEls = document.querySelectorAll(".sqr")
const messageEl = document.getElementById("message")

const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.
function init() {
    board = ["", "", "", "", "", "", "", "", ""]
    turn = "X"
    winner = false;
    tie = false;

    render();
}
init()

//4) The state of the game should be rendered to the user.
function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.innerText = turn
    } else if (winner === false && tie === true) {
        messageEl.innerText = "It's a tie"
    } else {
        messageEl.innerText = `Congrats! ${turn} wins`
    }
}

function updateBoard() {
    board.forEach(function (cell, idx) {
        squareEls[idx].innerText = cell;
    })
}

function render() {
    updateBoard();
    updateMessage();
}

function placePiece(idx) {
    board[idx] = turn;
}

function checkForWinner() {

    winningCombos.forEach((combo) => {
        const [idx1, idx2, idx3] = combo;

        if (board[idx1] === "") {
            return;
        } else if (board[idx1] === board[idx2] && board[idx1] === board[idx3]) {
            winner = true
        }
    })
}

function checkForTie() {
    if (winner) {
        return;
    }

    tie = board.every((cell) => (cell !== ""))
}

function switchPlayerTurn() {
    if (winner) return;

    if (turn === "X") {
        turn = "O"
    } else {
        turn = "X"
    }
}

//5) Define the required constants.
//6) Handle a player clicking a square with a `handleClick` function.
function handleClick(e) {
    const squareIndex = e.target.id;

    if (board[squareIndex]) {
        return;
    }

    if (winner) {
        return;
    }

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();

    render();
}

squareEls.forEach((square) => {
    square.addEventListener("click", handleClick)
})

//7) Create Reset functionality.
const resetBtnEl = document.getElementById("reset");
resetBtnEl.addEventListener("click", init)
