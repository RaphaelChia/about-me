'use client';

import GameOver from '@/app/lab/2048/components/game-over';
import GameWon from '@/app/lab/2048/components/game-won';
import Instructions from '@/app/lab/2048/components/instructions';
import TouchControls from '@/app/lab/2048/components/touch-controls';
import Two048Context from '@/app/lab/2048/components/two048-context';
import Two048Tiles from '@/app/lab/2048/components/two048-tiles';
import {
  addRandomTile,
  arraysEqual,
  checkGameOver,
  initializeGrid,
  moveRowLeft,
} from '@/app/lab/2048/utils';
import { Button } from '@/components/general/button';
import KeyboardHint from '@/components/general/keyboard-hint';
import useKeybindListener from '@/hooks/keyboard/use-keybind-listener';
import { highScoreAtom } from '@/lib/atoms';
import { cn } from '@/lib/utils';
import { IconBook, IconCornerDownLeft } from '@tabler/icons-react';
import { atom, useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';

// Jotai atoms
const gameStateAtom = atom({
  grid: Array(4)
    .fill(null)
    .map(() => Array(4).fill(0)),
  score: 0,
  gameOver: false,
  gameWon: false,
  gameStarted: false,
});

const TwoZeroFourEight = () => {
  const [highScore, setHighScore] = useAtom(highScoreAtom);
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const gameStarted = gameState.gameStarted;

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
      gameStarted: true,
    });
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
          gameStarted: gameState.gameStarted,
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
      gameState.gameStarted,
    ],
  );

  useKeybindListener({
    targetKey: 'enter',
    callback: () => {
      if (!gameStarted) {
        startGame();
      }
    },
  });

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
    <div className="relative flex w-full items-center justify-center gap-8 p-8 font-mono max-lg:flex-col">
      <div
        className={cn(
          'relative w-fit shrink-0 rounded-lg border border-transparent bg-white p-8 transition-all duration-500',
          gameStarted &&
            'translate-x-[6px] -translate-y-[6px] border-border shadow-button',
        )}
      >
        <h1 className="mb-4 text-start text-4xl font-bold text-gray-800">
          arrays[][]
        </h1>

        {/* Scores, Controls */}
        <div className="mb-4 flex items-stretch gap-2 max-md:flex-col">
          <div className="flex flex-col gap-1 max-md:flex-row">
            <Two048Context>
              <Button
                className="h-[33px] w-full flex-1 rounded-lg text-sm"
                variant={'inverted'}
              >
                <IconBook />
                Impl
              </Button>
            </Two048Context>
            <Button
              className="h-[33px] w-full flex-1 rounded-lg text-sm"
              variant={'border'}
              onClick={startGame}
            >
              {gameStarted ? (
                'New Game'
              ) : (
                <>
                  Start{' '}
                  <KeyboardHint
                    keys={[<IconCornerDownLeft key="keyboard-hint-1" />]}
                  >
                    <IconCornerDownLeft />
                  </KeyboardHint>
                </>
              )}
            </Button>
          </div>
          <div className="flex gap-2">
            <div className="min-w-20 p-2">
              <div className="text-sm">Score</div>
              <div className="text-xl font-bold">{gameState.score}</div>
            </div>
            <div className="min-w-20 p-2">
              <div className="text-sm">High Score</div>
              <div className="text-xl font-bold">{highScore}</div>
            </div>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid w-fit shrink-0 grid-cols-4 gap-5 rounded-lg">
          {gameState.grid.flat().map((value, index) => (
            <Two048Tiles key={index} value={value} />
          ))}
        </div>

        {/* Controls */}
      </div>
      <TouchControls showControls={gameStarted} onMove={moveGrid} />
      <div className="relative flex h-full flex-col justify-center gap-8">
        <Instructions />

        {/* Game Status Messages */}
        {gameState.gameWon && <GameWon startGame={startGame} />}
        {gameState.gameOver && <GameOver startGame={startGame} />}
        {/* <Two048Context /> */}
      </div>
    </div>
  );
};

export default TwoZeroFourEight;
