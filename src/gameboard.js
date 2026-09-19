import Ship from './ship.js';

export default class Gameboard {
  constructor() {
    this.board = Array.from(
      { length: 10 },
      () => Array(10).fill(null),
    );

    this.missedAttacks = [];
    this.ships = [];
    this.attackedCoordinates = new Set();
  }

  placeShip(length, [x, y], direction = 'horizontal') {
    const ship = new Ship(length);
    this.ships.push(ship);

    for (let i = 0; i < length; i += 1) {
      if (direction === 'vertical') {
        this.board[x][y + i] = ship;
      } else {
        this.board[x + i][y] = ship;
      }
    }
  }

  receiveAttack([x, y]) {
    const key = `${x},${y}`;
    if (this.attackedCoordinates.has(key)) {
      return;
    }
    
    this.attackedCoordinates.add(key);
    const ship = this.board[x][y];

    if (ship !== null) {
      ship.hit();
    } else {
      this.missedAttacks.push([x, y]);
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}