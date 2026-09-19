import Gameboard from './gameboard.js';

export default class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();

    this.availableMoves = Array.from(
      { length: 100 },
      (_, index) => [
        index % 10,
        Math.floor(index / 10),
      ],
    );
  }

  randomAttack(gameboard) {
    const randomIndex = Math.floor(
      Math.random() * this.availableMoves.length,
    );

    const [coordinates] = this.availableMoves.splice(randomIndex, 1);

    gameboard.receiveAttack(coordinates);

    return coordinates;
  }
}