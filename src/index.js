import './styles.css';
import Player from './player.js';
import { renderBoard } from './dom.js';

const human = new Player('human');
const computer = new Player('computer');

human.gameboard.placeShip(3, [1, 2]);
human.gameboard.placeShip(2, [6, 5], 'vertical');

computer.gameboard.placeShip(3, [4, 3]);
computer.gameboard.placeShip(2, [8, 6], 'vertical');

const game = document.querySelector('#game');

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

  game.replaceChildren(humanBoard, computerBoard);
}

game.addEventListener('click', (event) => {
  const cell = event.target.closest('.cell');

  if (!cell || cell.disabled) {
    return;
  }

  const x = Number(cell.dataset.x);
  const y = Number(cell.dataset.y);

  computer.gameboard.receiveAttack([x, y]);

  renderGame();
});

renderGame();