'use client';

import Instructions from '@/app/lab/2048/components/instructions';
import Two048Tiles from '@/app/lab/2048/components/two048-tiles';
import { Button } from '@/components/general/button';
import { cn } from '@/lib/utils';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback, useEffect, useState } from 'react';

// Jotai atoms
const highScoreAtom = atomWithStorage('highScore', 0);
const gameStateAtom = atom({
  grid: Array(4)
    .fill(null)
    .map(() => Array(4).fill(0)),
  score: 0,
  gameOver: false,
  gameWon: false,
});

const CHANCE_OF_2 = 0.9;

// Pure functions moved outside component
const initializeGrid = () => {
  return Array(4)
    .fill(null)
    .map(() => Array(4).fill(0));
};

const addRandomTile = (grid: number[][]) => {
  const emptyCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = grid.map((row) => [...row]);
    newGrid[randomCell[0]][randomCell[1]] = Math.random() < CHANCE_OF_2 ? 2 : 4;
    return newGrid;
  }
  return grid;
};

const moveRowLeft = (row: number[]) => {
  // Filter out zeros and move tiles left
  let filteredRow = row.filter((val) => val !== 0);
  let score = 0;

  // Merge adjacent identical tiles
  for (let i = 0; i < filteredRow.length - 1; i++) {
    if (filteredRow[i] === filteredRow[i + 1]) {
      filteredRow[i] *= 2;
      score += filteredRow[i];
      filteredRow[i + 1] = 0;
    }
  }

  // Filter out zeros again after merging
  filteredRow = filteredRow.filter((val) => val !== 0);

  // Pad with zeros to maintain row length
  while (filteredRow.length < 4) {
    filteredRow.push(0);
  }

  return { row: filteredRow, score };
};

const arraysEqual = (arr1: number[], arr2: number[]) => {
  return arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
};

const checkGameOver = (grid: number[][]) => {
  // Check for empty cells
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) return false;
    }
  }

  // Check for possible merges horizontally
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === grid[i][j + 1]) return false;
    }
  }

  // Check for possible merges vertically
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === grid[i + 1][j]) return false;
    }
  }

  return true;
};

const TwoZeroFourEight = () => {
  const [highScore, setHighScore] = useAtom(highScoreAtom);
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [gameStarted, setGameStarted] = useState(false);

  // Start new game
  const startGame = useCallback(() => {
    let newGrid = initializeGrid();
    newGrid = addRandomTile(newGrid);
    newGrid = addRandomTile(newGrid);

    setGameState({
      grid: newGrid,
      score: 0,
      gameOver: false,
      gameWon: false,
    });
    setGameStarted(true);
  }, [setGameState]);

  // Move grid in different directions
  const moveGrid = useCallback(
    (direction: string) => {
      if (gameState.gameOver) return;

      let newGrid = gameState.grid.map((row) => [...row]);
      let totalScore = 0;
      let moved = false;

      switch (direction) {
        case 'left':
          for (let i = 0; i < 4; i++) {
            const originalRow = [...newGrid[i]];
            const result = moveRowLeft(newGrid[i]);
            newGrid[i] = result.row;
            totalScore += result.score;
            if (!arraysEqual(originalRow, result.row)) moved = true;
          }
          break;

        case 'right':
          for (let i = 0; i < 4; i++) {
            // Just reversing the row and then moving it left then reconstructing it
            const originalRow = [...newGrid[i]];
            const reversedRow = [...newGrid[i]].reverse();
            const result = moveRowLeft(reversedRow);
            newGrid[i] = result.row.reverse();
            totalScore += result.score;
            if (!arraysEqual(originalRow, newGrid[i])) moved = true;
          }
          break;

        case 'up':
          for (let j = 0; j < 4; j++) {
            //Taking out column by column
            // This will end up with [r0c0, r1c0, r2c0, r3c0] and then we can pass it to moveRowLeft
            // Which is equivalent to shifting up after we reconstruct it.
            const column = [
              newGrid[0][j],
              newGrid[1][j],
              newGrid[2][j],
              newGrid[3][j],
            ];
            const originalColumn = [...column];
            const result = moveRowLeft(column);
            for (let i = 0; i < 4; i++) {
              newGrid[i][j] = result.row[i];
            }
            totalScore += result.score;
            if (!arraysEqual(originalColumn, result.row)) moved = true;
          }
          break;

        case 'down':
          for (let j = 0; j < 4; j++) {
            // Same as 'up' but reversed
            const column = [
              newGrid[3][j],
              newGrid[2][j],
              newGrid[1][j],
              newGrid[0][j],
            ];
            const originalColumn = [...column];
            const result = moveRowLeft(column);
            for (let i = 0; i < 4; i++) {
              newGrid[3 - i][j] = result.row[i];
            }
            totalScore += result.score;
            if (!arraysEqual(originalColumn, result.row)) moved = true;
          }
          break;
      }

      if (moved) {
        newGrid = addRandomTile(newGrid);
        const newScore = gameState.score + totalScore;

        // Check for win condition (2048)
        const hasWon = newGrid.some((row) => row.some((cell) => cell === 2048));

        // Check for game over
        const isGameOver = checkGameOver(newGrid);

        // Update high score
        if (newScore > highScore) {
          setHighScore(newScore);
        }

        setGameState({
          grid: newGrid,
          score: newScore,
          gameOver: isGameOver,
          gameWon: hasWon && !gameState.gameWon,
        });
      }
    },
    [
      gameState.gameOver,
      gameState.score,
      highScore,
      setGameState,
      gameState.gameWon,
      gameState.grid,
      setHighScore,
    ],
  );

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!gameStarted || gameState.gameOver) return;

      const key = event.key.toLowerCase();

      // put prevent default only inside the keys that are used in this game. Everything else should be left alone.
      switch (key) {
        case 'w':
        case 'arrowup':
          event.preventDefault();
          moveGrid('up');
          break;
        case 's':
        case 'arrowdown':
          event.preventDefault();
          moveGrid('down');
          break;
        case 'a':
        case 'arrowleft':
          event.preventDefault();
          moveGrid('left');
          break;
        case 'd':
        case 'arrowright':
          event.preventDefault();
          moveGrid('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameState.gameOver, moveGrid]);

  return (
    <div className="flex w-full items-center justify-center gap-8 p-8 font-mono">
      <div
        className={cn(
          'w-fit rounded-lg bg-white p-8 transition-shadow duration-500',
          gameStarted && 'shadow-2xl',
        )}
      >
        {/* <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">
          2048
        </h1> */}

        {/* Scores */}
        <div className="mb-4 flex items-stretch gap-2">
          <div className="flex flex-col gap-1">
            <Button
              className="col-span-2 w-[100px] flex-1 text-sm"
              variant={'inverted'}
              onClick={startGame}
            >
              {gameStarted ? 'New Game' : 'Start Game'}
            </Button>
            <div className="w-[100px] flex-1 bg-foreground"></div>
          </div>
          <div className="min-w-20 p-2">
            <div className="text-sm">Score</div>
            <div className="text-xl font-bold">{gameState.score}</div>
          </div>
          <div className="min-w-20 p-2">
            <div className="text-sm">High Score</div>
            <div className="text-xl font-bold">{highScore}</div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid size-[316px] grid-cols-4 gap-5 rounded-lg">
          {gameState.grid.flat().map((value, index) => (
            <Two048Tiles key={index} value={value} />
          ))}
        </div>

        {/* Game Status Messages */}
        {gameState.gameWon && (
          <div className="mb-4 rounded bg-green-100 p-3 text-center font-semibold text-green-800">
            🎉 You reached 2048! You won! 🎉
          </div>
        )}

        {gameState.gameOver && (
          <div className="mb-4 rounded bg-red-100 p-3 text-center font-semibold text-red-800">
            Game Over! No more moves available.
          </div>
        )}

        {/* Controls */}
      </div>
      <Instructions />
    </div>
  );
};

export default TwoZeroFourEight;
