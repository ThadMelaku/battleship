import Player from './player.js';
import Gameboard from './gameboard.js';

test('creates a human player with a gameboard', () => {
  const player = new Player('human');

  expect(player.type).toBe('human');
  expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test('creates a computer player with a gameboard', () => {
  const player = new Player('computer');

  expect(player.type).toBe('computer');
  expect(player.gameboard).toBeInstanceOf(Gameboard);
});

test('gives each player their own gameboard', () => {
  const human = new Player('human');
  const computer = new Player('computer');

  expect(human.gameboard).not.toBe(computer.gameboard);
});

test('computer makes random attacks without repeating coordinates', () => {
  const computer = new Player('computer');
  const human = new Player('human');

  jest.spyOn(Math, 'random').mockReturnValue(0);

  const firstAttack = computer.randomAttack(human.gameboard);
  const secondAttack = computer.randomAttack(human.gameboard);

  expect(firstAttack).toEqual([0, 0]);
  expect(secondAttack).toEqual([1, 0]);
  expect(human.gameboard.attackedCoordinates.size).toBe(2);

  Math.random.mockRestore();
});