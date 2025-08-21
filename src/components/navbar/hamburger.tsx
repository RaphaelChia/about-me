import { cn } from "@/lib/utils";

interface HamburgerProps extends React.ComponentProps<"div"> {
  open: boolean;
}

const Hamburger = ({ open, className, ...props }: HamburgerProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1  transition-all duration-500",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "w-5 h-0.5 rounded-full bg-foreground transition-all duration-500",
          open && "rotate-45 translate-y-[6px]"
        )}
      ></div>
      <div
        className={cn(
          "w-5 h-0.5 rounded-full bg-foreground transition-all duration-500",
          open && "opacity-0"
        )}
      ></div>
      <div
        className={cn(
          "w-5 h-0.5 rounded-full bg-foreground transition-all duration-500",
          open && "-rotate-45 -translate-y-[6px]"
        )}
      ></div>
    </div>
  );
};

export default Hamburger;
