import Ship from './ship.js';

test('creates a ship with the supplied length and zero hits', () => {
  const ship = new Ship(3);

  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
});

test('increases the hit count each time it is hit', () => {
  const ship = new Ship(3);

  ship.hit();
  expect(ship.hits).toBe(1);

  ship.hit();
  expect(ship.hits).toBe(2);
});

test('is not sunk when hits are fewer than its length', () => {
  const ship = new Ship(3);

  expect(ship.isSunk()).toBe(false);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(false);
});

test('is sunk when hits reach its length', () => {
  const ship = new Ship(3);

  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});