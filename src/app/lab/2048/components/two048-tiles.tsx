const Two048Tiles = ({ value }: { value: number }) => {
  return (
    <div
      className={`relative flex size-10 items-center justify-center rounded font-extrabold [--thickness:0.25rem] md:size-12 md:text-xl md:[--thickness:0.3rem] lg:size-16 lg:text-2xl lg:[--thickness:0.35rem]`}
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
