export function renderBoard(gameboard, label, showShips) {
  const section = document.createElement('section');

  const heading = document.createElement('h2');
  heading.textContent = label;

  const grid = document.createElement('div');
  grid.classList.add('board');

  for (let y = 0; y < 10; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.setAttribute('aria-label', `${label}: ${x}, ${y}`);

      if (showShips && gameboard.board[x][y] !== null) {
        cell.classList.add('ship');
      }

      const key = `${x},${y}`;

      if (gameboard.attackedCoordinates.has(key)) {
        if (gameboard.board[x][y] !== null) {
          cell.classList.add('hit');
          cell.textContent = '×';
        } else {
          cell.classList.add('miss');
          cell.textContent = '•';
        }

        cell.disabled = true;
      }

      grid.append(cell);
    }
  }

  section.append(heading, grid);
  return section;
}