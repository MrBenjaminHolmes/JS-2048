import "./styles.css";

const boardElement = document.getElementById("gameboard");

const board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

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
      }
      boardElement.append(square);
    });
  });
}

function randomPlacement(start) {
  const emptyTiles = document.querySelectorAll(".empty");
  if (emptyTiles.length === 0) return; // no empty tiles available

  const randomElement =
    emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

  let value;
  if (start) {
    value = "2";
  } else {
    value = Math.random() < 0.9 ? "2" : "4";
  }

  randomElement.textContent = value;
  const row = parseInt(randomElement.dataset.row);
  const col = parseInt(randomElement.dataset.col);
  board[row][col] = value;
  randomElement.classList.remove("empty");
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
}

drawBoard();
randomPlacement(true);
randomPlacement(true);

addEventListener("keyup", (event) => {
  if (event.key === "w" || event.key == "ArrowUp") {
    compress("up");
  }
  if (event.key === "a" || event.key === "ArrowLeft") {
    compress("left");
  }
  if (event.key === "s" || event.key === "ArrowDown") {
    compress("down");
  }
  if (event.key === "d" || event.key === "ArrowRight") {
    compress("right");
  }
});
