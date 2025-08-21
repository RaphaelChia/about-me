const Two048Tiles = ({ value }: { value: number }) => {
  return (
    <div
      className={`relative flex h-16 w-16 items-center justify-center rounded text-lg font-extrabold [--thickness:0.35rem]`}
    >
      <div className="absolute top-0 left-0 h-full w-(--thickness) bg-foreground"></div>
      <div className="absolute top-0 right-0 h-full w-(--thickness) bg-foreground"></div>
      <div className="absolute top-0 left-(--thickness) size-(--thickness) bg-foreground"></div>
      <div className="absolute bottom-0 left-(--thickness) size-(--thickness) bg-foreground"></div>
      <div className="absolute right-(--thickness) bottom-0 size-(--thickness) bg-foreground"></div>
      <div className="absolute top-0 right-(--thickness) size-(--thickness) bg-foreground"></div>
      {value !== 0 ? value : ''}
    </div>
  );
};

export default Two048Tiles;
