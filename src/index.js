import "./styles.css";

const boardElement = document.getElementById("gameboard");
const newGameBttn = document.getElementById("newGame");
const highscoreElement = document.getElementById("highscore");
let highscore = 0;
let compressed = false;
let compressed2 = false;
let merged = false;
let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function newGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  drawBoard();
  randomPlacement(true);
  randomPlacement(true);
  drawBoard();
  drawBoard();
}

function drawBoard() {
  boardElement.innerHTML = "";
  board.forEach((row, rowIndex) => {
    row.forEach((cellValue, colIndex) => {
      const square = document.createElement("div");
      square.classList.add("square");
      square.textContent = cellValue === 0 ? "" : cellValue;
      square.dataset.row = rowIndex;
      square.dataset.col = colIndex;
      if (cellValue === 0) {
        square.classList.add("empty");
      } else {
        square.classList.add(`value-${cellValue}`);
      }

      boardElement.append(square);
    });
  });
  highscoreElement.textContent = "Highscore: " + highscore;
}

function randomPlacement(start) {
  let emptyCells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) emptyCells.push([r, c]);
    }
  }
  if (emptyCells.length === 0) return;

  const [randomRow, randomCol] =
    emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const value = start ? 2 : Math.random() < 0.9 ? 2 : 4;
  board[randomRow][randomCol] = value;
  drawBoard();
}

function compress(direction) {
  let moved = false;

  if (direction === "up") {
    for (let col = 0; col < 4; col++) {
      for (let row = 1; row < 4; row++) {
        if (board[row][col] !== 0) {
          let currentRow = row;
          while (currentRow > 0 && board[currentRow - 1][col] === 0) {
            board[currentRow - 1][col] = board[currentRow][col];
            board[currentRow][col] = 0;
            currentRow--;
            moved = true;
          }
        }
      }
    }
  }

  if (direction === "down") {
    for (let col = 0; col < 4; col++) {
      for (let row = 2; row >= 0; row--) {
        if (board[row][col] !== 0) {
          let currentRow = row;
          while (currentRow < 3 && board[currentRow + 1][col] === 0) {
            board[currentRow + 1][col] = board[currentRow][col];
            board[currentRow][col] = 0;
            currentRow++;
            moved = true;
          }
        }
      }
    }
  }

  if (direction === "left") {
    for (let row = 0; row < 4; row++) {
      for (let col = 1; col < 4; col++) {
        if (board[row][col] !== 0) {
          let currentCol = col;
          while (currentCol > 0 && board[row][currentCol - 1] === 0) {
            board[row][currentCol - 1] = board[row][currentCol];
            board[row][currentCol] = 0;
            currentCol--;
            moved = true;
          }
        }
      }
    }
  }

  if (direction === "right") {
    for (let row = 0; row < 4; row++) {
      for (let col = 2; col >= 0; col--) {
        if (board[row][col] !== 0) {
          let currentCol = col;
          while (currentCol < 3 && board[row][currentCol + 1] === 0) {
            board[row][currentCol + 1] = board[row][currentCol];
            board[row][currentCol] = 0;
            currentCol++;
            moved = true;
          }
        }
      }
    }
  }

  if (moved) {
    drawBoard();
  }
  return moved;
}

function merge(direction) {
  let merged = false;
  if (direction === "up") {
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (board[row][col] !== 0 && board[row][col] === board[row + 1][col]) {
          board[row][col] *= 2;
          if (board[row][col] > highscore) {
            highscore = board[row][col];
          }
          board[row + 1][col] = 0;
          merged = true;
        }
      }
    }
  }

  if (direction === "down") {
    for (let col = 0; col < 4; col++) {
      for (let row = 3; row > 0; row--) {
        if (board[row][col] !== 0 && board[row][col] === board[row - 1][col]) {
          board[row][col] *= 2;
          if (board[row][col] > highscore) {
            highscore = board[row][col];
          }
          board[row - 1][col] = 0;
          merged = true;
        }
      }
    }
  }

  if (direction === "left") {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] !== 0 && board[row][col] === board[row][col + 1]) {
          board[row][col] *= 2;
          if (board[row][col] > highscore) {
            highscore = board[row][col];
          }
          board[row][col + 1] = 0;
          merged = true;
        }
      }
    }
  }

  if (direction === "right") {
    for (let row = 0; row < 4; row++) {
      for (let col = 3; col > 0; col--) {
        if (board[row][col] !== 0 && board[row][col] === board[row][col - 1]) {
          board[row][col] *= 2;
          if (board[row][col] > highscore) {
            highscore = board[row][col];
          }
          board[row][col - 1] = 0;
          merged = true;
        }
      }
    }
  }

  drawBoard();
}

//Initiate New Game
newGame();

//Add Event Listeners to Keys
addEventListener("keyup", (event) => {
  if (event.key === "w" || event.key == "ArrowUp") {
    compressed = compress("up");
    merged = merge("up");
    compressed2 = compress("up");
    if (compressed || merged || compressed2) {
      randomPlacement();
    }
    if (checkLoss()) {
      console.log("Game Over");
    }
  }
  if (event.key === "a" || event.key === "ArrowLeft") {
    compressed = compress("left");
    merged = merge("left");
    compressed2 = compress("left");
    if (compressed || merged || compressed2) {
      randomPlacement();
    }
    if (checkLoss()) {
      console.log("Game Over");
      newGame();
    }
  }
  if (event.key === "s" || event.key === "ArrowDown") {
    compressed = compress("down");
    merged = merge("down");
    compressed2 = compress("down");
    if (compressed || merged || compressed2) {
      randomPlacement();
    }
    if (checkLoss()) {
      console.log("Game Over");
      newGame();
    }
  }
  if (event.key === "d" || event.key === "ArrowRight") {
    compressed = compress("right");
    merged = merge("right");
    compressed2 = compress("right");
    if (compressed || merged || compressed2) {
      randomPlacement();
    }
    if (checkLoss()) {
      console.log("Game Over");
      newGame();
    }
  }
});

newGameBttn.addEventListener("click", (event) => {
  newGame();
});

function checkLoss() {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board[r][c] === 0) {
        return false;
      }
    }
  }

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[r][c] === board[r][c + 1]) {
        return false;
      }
    }
  }

  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 3; r++) {
      if (board[r][c] === board[r + 1][c]) {
        return false;
      }
    }
  }
  return true;
}
