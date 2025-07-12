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
  const squareNodeList = document.querySelectorAll(".square");
  const square = Array.from(squareNodeList).filter(
    (el) => !el.classList.contains("empty")
  );
  if (direction === "up") {
    square.forEach((square) => {
      const row = parseInt(square.dataset.row);
      const col = parseInt(square.dataset.col);

      if (row > 0 && board[row - 1][col] === 0) {
        console.log("move up");
        board[row][col] = 0;
        board[row - 1][col] = square.innerHTML;
        drawBoard();
      }
    });
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
    console.log("left");
  }
  if (event.key === "s" || event.key === "ArrowDown") {
    console.log("down");
  }
  if (event.key === "d" || event.key === "ArrowRight") {
    console.log("right");
  }
});
