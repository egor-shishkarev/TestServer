const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);

function handleCellClick(e) {
  const cellIndex = parseInt(e.target.id.split('-')[1]);
  if (gameState[cellIndex] !== '' || !gameActive) return;

  gameState[cellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    alert("It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    return winningCombos.some(combo => {
        return combo.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return !gameState.includes('');
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });

    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
}