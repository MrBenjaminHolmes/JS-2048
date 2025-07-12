import "./styles.css";

const boardElement = document.getElementById("gameboard");
const board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function createBoard() {
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
  randomElement.classList.remove("empty");
}

createBoard();
randomPlacement(true);
randomPlacement(true);
randomPlacement();
