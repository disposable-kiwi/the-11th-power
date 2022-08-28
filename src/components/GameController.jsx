import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {getEmptyBoard, isFull, generateRandom, moveLeft, moveRight, moveDown, moveUp, checkWin, isOver} from './GameBoard';

const Cell = ({ number }) => {
    return (
      <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
    );
  };

const GameController = () =>{
    const [board, updateBoard] = useState(generateRandom(getEmptyBoard()));
    const checkEndGame = ()=>{
        if(checkWin(board)){
            alert("You win!");
        }else if (isOver(board)){
            alert("Game over!");
        }
    };
    
    const left = ()=>{
        const newBoard = moveLeft(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const right = ()=>{
        const newBoard = moveRight(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const up = ()=>{
        const newBoard = moveUp(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const down = ()=>{
        const newBoard = moveDown(board);
        updateBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const onKeyDown = (event) =>{
        switch(event.key){
            case "ArrowLeft":
                left();
                break;
            case "ArrowRight":
                right();
                break;
            case "ArrowUp":
                up();
                break;
            case "ArrowDown":
                down();
                break;
            default:
                alert("This game is played with arrow keys, please continue with the arrow keys.");
                break;
        };
    };

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
    
        return () => {
          window.removeEventListener("keydown", onKeyDown);
        };
      });
    
      return (
        <>
          <div className="game-board">
            {board.map((row, i) => {
              return (
                <div key={`row-${i}`} className="row">
                  {row.map((cell, j) => (
                    <Cell key={`cell-${i}-${j}`} number={cell} />
                  ))}
                </div>
              );
            })}
          </div>
        </>
      );
};

export default GameController;