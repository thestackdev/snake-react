const SIZE = 800;
const SPEED = 180;
const SNAKE = [
  [0, 0],
  [0, 1],
];
const FOOD = [10, 10];
const SCALE = 40;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
};

export { SIZE, SPEED, SCALE, SNAKE, FOOD, DIRECTIONS };
