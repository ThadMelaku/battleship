import './styles.css';
import Player from './player.js';
import { renderBoard } from './dom.js';

const fleet = [5, 4, 3, 3, 2];

const game = document.querySelector('#game');
const status = document.querySelector('#status');
const randomizeButton = document.querySelector('#randomize');
const newGameButton = document.querySelector('#new-game');

let human;
let computer;
let gameOver;

function renderGame() {
  const humanBoard = renderBoard(
    human.gameboard,
    'Your board',
    true,
  );

  const computerBoard = renderBoard(
    computer.gameboard,
    'Computer board',
    false,
  );

  humanBoard.querySelectorAll('.cell').forEach((cell) => {
    cell.disabled = true;
  });

  if (gameOver) {
    computerBoard.querySelectorAll('.cell').forEach((cell) => {
      cell.disabled = true;
    });
  }

  game.replaceChildren(humanBoard, computerBoard);
}

function startNewGame() {
  human = new Player('human');
  computer = new Player('computer');

  human.gameboard.placeFleetRandomly(fleet);
  computer.gameboard.placeFleetRandomly(fleet);

  gameOver = false;
  status.textContent = 'Your turn';
  randomizeButton.disabled = false;

  renderGame();
}

randomizeButton.addEventListener('click', () => {
  human = new Player('human');
  human.gameboard.placeFleetRandomly(fleet);

  renderGame();
});

newGameButton.addEventListener('click', startNewGame);

game.addEventListener('click', (event) => {
  const cell = event.target.closest('.cell');

  if (!cell || cell.disabled || gameOver) {
    return;
  }

  const x = Number(cell.dataset.x);
  const y = Number(cell.dataset.y);

  randomizeButton.disabled = true;

  computer.gameboard.receiveAttack([x, y]);

  if (computer.gameboard.allShipsSunk()) {
    gameOver = true;
    status.textContent = 'You win!';
    renderGame();
    return;
  }

  computer.randomAttack(human.gameboard);

  if (human.gameboard.allShipsSunk()) {
    gameOver = true;
    status.textContent = 'Computer wins!';
  } else {
    status.textContent = 'Your turn';
  }

  renderGame();
});

startNewGame();