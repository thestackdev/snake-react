import React, { useEffect, useState, useRef } from "react";
import { SIZE, SPEED, SCALE, SNAKE, FOOD, DIRECTIONS } from "./Dumps/Constants";
import { Loop } from "./Dumps/Loop";
import "./App.module.css";
import styles from "./App.module.css";

export const App = () => {
  const canvasRef = useRef();
  const [snake, updateSnake] = useState(SNAKE);
  const [food, updateFood] = useState(FOOD);
  const [direction, updateDirection] = useState([0, 1]);
  const [speed, updateSpeed] = useState(0);
  const [isRunning, updateIsRunning] = useState(true);
  const [buttonText, updateButtonText] = useState("Play Game");

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerHeight, window.innerWidth);
    context.fillStyle = "lightblue";
    snake.forEach((piece) => context.fillRect(piece[0], piece[1], 1, 1));
    context.fillStyle = "red";
    context.fillRect(food[0], food[1], 1, 1);
  }, [snake]);

  const checkIfDeath = (snakeHead) => {
    if (
      snakeHead[0] < 0 ||
      snakeHead[1] < 0 ||
      snakeHead[0] > SIZE / SCALE - 1 ||
      snakeHead[1] > SIZE / SCALE - 1
    ) {
      return true;
    }
    return false;
  };

  const checkIfEat = (snakeHead) => {
    if (snakeHead[0] === food[0] && snakeHead[1] === food[1]) {
      updateFood(food.map((_f) => Math.floor((Math.random() * SIZE) / SCALE)));
      return true;
    }
    return false;
  };

  Loop(() => {
    const duplicateSnake = [...snake];
    const newHead = [
      duplicateSnake[0][0] + direction[0],
      duplicateSnake[0][1] + direction[1],
    ];

    duplicateSnake.unshift(newHead);
    if (checkIfDeath(duplicateSnake[0])) {
      updateSpeed(0);
      updateIsRunning(false);
    } else {
      if (!checkIfEat(duplicateSnake[0])) duplicateSnake.pop();
      updateSnake(duplicateSnake);
    }
  }, speed);

  const handleKeys = ({ keyCode }) => {
    switch (keyCode) {
      case 37:
        if (direction[0] !== 1) updateDirection(DIRECTIONS[keyCode]);
        break;
      case 38:
        if (direction[1] !== 1) updateDirection(DIRECTIONS[keyCode]);
        break;
      case 39:
        if (direction[0] !== -1) updateDirection(DIRECTIONS[keyCode]);
        break;
      case 40:
        if (direction[1] !== -1) updateDirection(DIRECTIONS[keyCode]);
        break;
      case 32:
        updateSpeed((prev) => (prev ? 0 : SPEED));
        break;
      default:
        break;
    }
  };

  const handleButtonClick = (event) => {
    const textValue = event.target.innerHTML;
    if (textValue === "Play Game" || textValue === "Resume Game") {
      updateSpeed(SPEED);
      updateButtonText("Pause Game");
    } else if (textValue === "Pause Game") {
      updateSpeed(0);
      updateButtonText("Resume Game");
    }
  };

  return (
    <>
      {isRunning ? (
        <div className={styles.container}>
          <canvas
            tabIndex={0}
            onKeyDown={handleKeys}
            ref={canvasRef}
            width={`${SIZE}px`}
            height={`${SIZE}px`}
          />
          <button onClick={handleButtonClick}>{buttonText}</button>
        </div>
      ) : (
        <div>Game Over</div>
      )}
    </>
  );
};
