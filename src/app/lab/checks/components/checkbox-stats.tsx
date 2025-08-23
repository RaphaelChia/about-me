const TOTAL_BARS = 16;
const CheckboxStorageStats = () => {
  return (
    <div className="flex w-full items-center gap-3 [--bar-height:24px] [--bar-width:16px] max-sm:[--bar-height:16px] max-sm:[--bar-width:10px]">
      <div className="flex w-full flex-col items-stretch">
        <div className="flex items-center">
          {/* Graph */}
          <div className="relative flex h-(--bar-height) w-full gap-1 px-4">
            <div className="absolute flex gap-1">
              <div className="absolute right-0 bg-background/60 px-1 text-xs font-semibold max-sm:hidden">
                100%
              </div>
              <span className="absolute top-0 left-0 -translate-x-full translate-y-[-20%] text-3xl font-bold max-sm:text-xl">
                [
              </span>
              <span className="absolute top-0 right-0 translate-x-full translate-y-[-20%] text-3xl font-bold max-sm:text-xl">
                ]
              </span>

              {Array.from({ length: TOTAL_BARS }).map((_, index) => (
                <div
                  key={index}
                  className="h-(--bar-height) w-(--bar-width) rounded-sm bg-foreground-neutral/50"
                ></div>
              ))}
            </div>
            <div className="absolute flex gap-1">
              <div className="absolute right-0 bg-background/60 px-1 text-xs font-semibold max-sm:hidden">
                25%
              </div>
              {Array.from({ length: Math.floor(TOTAL_BARS * 0.25) }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-(--bar-height) w-(--bar-width) rounded-sm bg-green-700"
                  ></div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-2 flex items-center gap-8 px-1 text-xs">
          <div className="flex items-center gap-1">
            <div className="h-4 w-2 shrink-0 rounded-[2px] bg-green-700"></div>
            <div className="">Base64 Storage</div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-2 shrink-0 rounded-[2px] bg-foreground-neutral/50"></div>
            <div className="">Boolean Storage</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxStorageStats;
