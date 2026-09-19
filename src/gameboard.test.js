import Gameboard from './gameboard.js';

test('places a ship horizontally at the supplied coordinates', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(3, [2, 4]);

  const ship = gameboard.board[2][4];

  expect(ship.length).toBe(3);
  expect(gameboard.board[3][4]).toBe(ship);
  expect(gameboard.board[4][4]).toBe(ship);
  expect(gameboard.board[5][4]).toBeNull();
});

test('places a ship vertically at the supplied coordinates', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(3, [2, 4], 'vertical');

  const ship = gameboard.board[2][4];

  expect(ship.length).toBe(3);
  expect(gameboard.board[2][5]).toBe(ship);
  expect(gameboard.board[2][6]).toBe(ship);
  expect(gameboard.board[2][7]).toBeNull();
});

test('an attack on an occupied cell hits its ship', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(3, [2, 4]);
  gameboard.placeShip(2, [0, 0]);

  gameboard.receiveAttack([3, 4]);

  expect(gameboard.board[2][4].hits).toBe(1);
  expect(gameboard.board[0][0].hits).toBe(0);
});

test('records the coordinates of missed attacks', () => {
  const gameboard = new Gameboard();

  gameboard.receiveAttack([3, 4]);
  gameboard.receiveAttack([0, 0]);

  expect(gameboard.missedAttacks).toEqual([
    [3, 4],
    [0, 0],
  ]);
});

test('reports whether all placed ships have been sunk', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(2, [0, 0]);
  gameboard.placeShip(1, [4, 4]);

  expect(gameboard.allShipsSunk()).toBe(false);

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([1, 0]);

  expect(gameboard.allShipsSunk()).toBe(false);

  gameboard.receiveAttack([4, 4]);

  expect(gameboard.allShipsSunk()).toBe(true);
});

test('ignores repeated attacks on the same coordinate', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(2, [2, 4]);

  gameboard.receiveAttack([2, 4]);
  gameboard.receiveAttack([2, 4]);

  expect(gameboard.board[2][4].hits).toBe(1);

  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 0]);

  expect(gameboard.missedAttacks).toEqual([[0, 0]]);
});

test('does not place a ship outside the board', () => {
  const gameboard = new Gameboard();

  const placed = gameboard.placeShip(3, [8, 0]);

  expect(placed).toBe(false);
  expect(gameboard.ships).toHaveLength(0);
});

test('does not place a ship on top of another ship', () => {
  const gameboard = new Gameboard();

  gameboard.placeShip(3, [2, 4]);

  const placed = gameboard.placeShip(3, [3, 3], 'vertical');

  expect(placed).toBe(false);
  expect(gameboard.ships).toHaveLength(1);
});

test('places an entire fleet randomly without overlaps', () => {
  const gameboard = new Gameboard();
  const randomMock = jest.spyOn(Math, 'random').mockReturnValue(0);

  gameboard.placeFleetRandomly([5, 4, 3, 3, 2]);

  const occupiedCells = gameboard.board
    .flat()
    .filter((cell) => cell !== null);

  expect(gameboard.ships).toHaveLength(5);
  expect(occupiedCells).toHaveLength(17);

  randomMock.mockRestore();
});