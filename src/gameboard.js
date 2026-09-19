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
    if (!this.canPlaceShip(length, [x, y], direction)) {
      return false;
    }

    const ship = new Ship(length);
    this.ships.push(ship);

    for (let i = 0; i < length; i += 1) {
      if (direction === 'vertical') {
        this.board[x][y + i] = ship;
      } else {
        this.board[x + i][y] = ship;
      }
    }

    return true;
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

  canPlaceShip(length, [x, y], direction = 'horizontal') {
    for (let i = 0; i < length; i += 1) {
      const currentX = direction === 'horizontal' ? x + i : x;
      const currentY = direction === 'vertical' ? y + i : y;

      const outsideBoard =
        currentX < 0 ||
        currentX >= 10 ||
        currentY < 0 ||
        currentY >= 10;

      if (
        outsideBoard ||
        this.board[currentX][currentY] !== null
      ) {
        return false;
      }
    }

    return true;
  }

  placeFleetRandomly(lengths) {
    lengths.forEach((length) => {
      const validPlacements = [];

      for (let x = 0; x < 10; x += 1) {
        for (let y = 0; y < 10; y += 1) {
          ['horizontal', 'vertical'].forEach((direction) => {
            if (this.canPlaceShip(length, [x, y], direction)) {
              validPlacements.push({
                coordinates: [x, y],
                direction,
              });
            }
          });
        }
      }

      const randomIndex = Math.floor(
        Math.random() * validPlacements.length,
      );

      const placement = validPlacements[randomIndex];

      this.placeShip(
        length,
        placement.coordinates,
        placement.direction,
      );
    });
  }
}