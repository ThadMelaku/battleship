import './styles.css';
import Player from './player.js';
import { renderBoard } from './dom.js';

const fleet = [5, 4, 3, 3, 2];

let human = new Player('human');
const computer = new Player('computer');

human.gameboard.placeFleetRandomly(fleet);
computer.gameboard.placeFleetRandomly(fleet);

const game = document.querySelector('#game');
const status = document.querySelector('#status');
const randomizeButton = document.querySelector('#randomize');

let gameOver = false;

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

randomizeButton.addEventListener('click', () => {
  human = new Player('human');
  human.gameboard.placeFleetRandomly(fleet);

  renderGame();
});

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

renderGame();