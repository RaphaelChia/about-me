const TOTAL_BARS = 20;
const BAR_WIDTH = 20;
const BAR_HEIGHT = 32;
const CheckboxStats = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col">
        <span>Space Efficiency</span>

        {/* Graph */}
        <div
          className="relative flex gap-1"
          style={{
            width: TOTAL_BARS * BAR_WIDTH + 4 * (TOTAL_BARS - 1),
            height: BAR_HEIGHT,
          }}
        >
          <div className="absolute flex gap-1">
            {Array.from({ length: TOTAL_BARS }).map((_, index) => (
              <div
                style={{
                  width: BAR_WIDTH,
                  height: BAR_HEIGHT,
                }}
                key={index}
                className="rounded-sm bg-foreground-neutral/30"
              >
                <div className="absolute right-0 bg-background px-1 text-xs font-semibold">
                  901.8kb
                </div>
              </div>
            ))}
          </div>
          <div className="absolute flex gap-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: BAR_WIDTH,
                  height: BAR_HEIGHT,
                }}
                className="rounded-sm bg-green-700"
              >
                <div className="absolute right-0 bg-background px-1 text-xs font-semibold">
                  31.8kb
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-8 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-4 w-2 shrink-0 rounded-[2px] bg-green-700"></div>
            <div className="">Bit Storage</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-2 shrink-0 rounded-[2px] bg-foreground-neutral/30"></div>
            <div className="">Boolean Storage</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxStats;
