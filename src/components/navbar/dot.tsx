import { cn } from "@/lib/utils";

const Dot = ({
  color,
  hoverElement,
}: {
  color: string;
  hoverElement?: React.ReactNode;
}) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={cn("size-3 rounded-full flex")}
    >
      <div className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-300 flex items-center justify-center size-full">
        {hoverElement}
      </div>
    </div>
  );
};

export default Dot;
