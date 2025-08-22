const Instructions = () => {
  return (
    <div className="text-center text-sm text-foreground-neutral">
      <p className="max-md:hidden">
        Use <strong>WASD</strong> or <strong>Arrow Keys</strong> to move tiles
      </p>
      <p className="md:hidden">
        Tap the given controls to move tiles in that direction.{' '}
      </p>
      <p className="mt-1">Combine tiles with the same number to reach 2048!</p>
    </div>
  );
};

export default Instructions;
