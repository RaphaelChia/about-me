const GameOver = ({ startGame }: { startGame: () => void }) => {
  return (
    <div
      onClick={startGame}
      className="absolute top-0 left-0 h-full w-full cursor-pointer backdrop-blur-xs max-sm:fixed"
    >
      <div className="top-1/2 left-1/2 mb-4 -translate-x-1/2 -translate-y-1/2 rounded border bg-card p-3 text-center text-sm font-semibold text-foreground max-sm:fixed max-sm:w-[300px] max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 sm:absolute">
        Game Over! No more moves available.
        <br />
        <br />
        <p>Press Enter or click here to start a new game</p>
      </div>
    </div>
  );
};

export default GameOver;
