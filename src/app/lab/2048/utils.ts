const CHANCE_OF_2 = 0.9;

export const getTileColor = (value: number) => {
  const colors: { [key: number]: string } = {
    0: 'bg-gray-200',
    2: 'bg-gray-300 text-gray-800',
    4: 'bg-gray-400 text-gray-800',
    8: 'bg-orange-300 text-white',
    16: 'bg-orange-400 text-white',
    32: 'bg-orange-500 text-white',
    64: 'bg-red-400 text-white',
    128: 'bg-yellow-400 text-white',
    256: 'bg-yellow-500 text-white',
    512: 'bg-yellow-600 text-white',
    1024: 'bg-purple-500 text-white',
    2048: 'bg-purple-600 text-white',
  };
  return colors[value] || 'bg-purple-700 text-white';
};

// Pure functions moved outside component
export const initializeGrid = () => {
  return Array(4)
    .fill(null)
    .map(() => Array(4).fill(0));
};

export const addRandomTile = (grid: number[][]) => {
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

export const moveRowLeft = (row: number[]) => {
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

export const arraysEqual = (arr1: number[], arr2: number[]) => {
  return arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
};

export const checkGameOver = (grid: number[][]) => {
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
