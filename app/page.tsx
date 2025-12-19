"use client";
import React, { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerMoves, setPlayerMoves] = useState([]);
  const [botMoves, setBotMoves] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (currentBoard) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // cols
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const makeMove = (index, player) => {
    if (board[index] || gameOver) return false;

    const newBoard = [...board];
    newBoard[index] = player;

    let newPlayerMoves = [...playerMoves];
    let newBotMoves = [...botMoves];

    if (player === "X") {
      newPlayerMoves.push(index);
      if (newPlayerMoves.length > 3) {
        const removed = newPlayerMoves.shift();
        newBoard[removed] = null;
      }
    } else {
      newBotMoves.push(index);
      if (newBotMoves.length > 3) {
        const removed = newBotMoves.shift();
        newBoard[removed] = null;
      }
    }

    setBoard(newBoard);
    setPlayerMoves(newPlayerMoves);
    setBotMoves(newBotMoves);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
    }

    return true;
  };

  const botMove = () => {
    const emptySpots = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptySpots.length === 0) return;

    // Simple bot: try to win, block player, or random
    const tryWin = findWinningMove("O");
    if (tryWin !== -1) {
      makeMove(tryWin, "O");
      return;
    }

    const blockPlayer = findWinningMove("X");
    if (blockPlayer !== -1) {
      makeMove(blockPlayer, "O");
      return;
    }

    // Take center if available
    if (emptySpots.includes(4)) {
      makeMove(4, "O");
      return;
    }

    // Random move
    const randomIdx = emptySpots[Math.floor(Math.random() * emptySpots.length)];
    makeMove(randomIdx, "O");
  };

  const findWinningMove = (player) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      const values = [board[a], board[b], board[c]];
      const playerCount = values.filter((v) => v === player).length;
      const emptyCount = values.filter((v) => v === null).length;

      if (playerCount === 2 && emptyCount === 1) {
        if (board[a] === null) return a;
        if (board[b] === null) return b;
        if (board[c] === null) return c;
      }
    }
    return -1;
  };

  const handleClick = (index) => {
    if (!isPlayerTurn || gameOver) return;

    if (makeMove(index, "X")) {
      setIsPlayerTurn(false);
    }
  };

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        botMove();
        setIsPlayerTurn(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, gameOver]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayerMoves([]);
    setBotMoves([]);
    setIsPlayerTurn(true);
    setWinner(null);
    setGameOver(false);
  };

  const getCellOpacity = (index) => {
    if (!board[index]) return 1;

    if (board[index] === "X") {
      const moveIndex = playerMoves.indexOf(index);
      if (moveIndex === 0 && playerMoves.length === 3) return 0.4;
      if (moveIndex === 1 && playerMoves.length === 3) return 0.7;
    } else {
      const moveIndex = botMoves.indexOf(index);
      if (moveIndex === 0 && botMoves.length === 3) return 0.4;
      if (moveIndex === 1 && botMoves.length === 3) return 0.7;
    }
    return 1;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Limited Tic Tac Toe
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Max 3 pieces per player!
        </p>

        <div className="mb-6 text-center">
          {gameOver ? (
            <div className="text-2xl font-bold text-green-600">
              {winner === "X" ? "🎉 You Win!" : "🤖 Bot Wins!"}
            </div>
          ) : (
            <div className="text-xl font-semibold text-gray-700">
              {isPlayerTurn ? "🎮 Your Turn (X)" : "🤖 Bot Thinking..."}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!isPlayerTurn || gameOver}
              className="aspect-square bg-gray-100 hover:bg-gray-200 disabled:hover:bg-gray-100 rounded-xl flex items-center justify-center text-5xl font-bold transition-all duration-200 border-2 border-gray-300 shadow-md"
              style={{ opacity: getCellOpacity(index) }}
            >
              <span className={cell === "X" ? "text-blue-500" : "text-red-500"}>
                {cell}
              </span>
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-4 mb-4">
          <div className="text-sm">
            <span className="font-semibold">Your pieces:</span>{" "}
            {playerMoves.length}/3
          </div>
          <div className="text-sm">
            <span className="font-semibold">Bot pieces:</span> {botMoves.length}
            /3
          </div>
        </div>

        <button
          onClick={resetGame}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          New Game
        </button>
      </div>
    </div>
  );
}
