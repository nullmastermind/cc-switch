import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<
  typeof SwitchPrimitives.Root
> {
  /** default: 30x18 track; sm: 26x16 (for dense rows) */
  size?: "default" | "sm";
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size = "default", ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    data-size={size}
    className={cn(
      "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-0 p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-muted",
      size === "sm" ? "h-4 w-[26px]" : "h-[18px] w-[30px]",
      className,
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block rounded-full shadow-sm ring-0 transition-transform data-[state=checked]:bg-white data-[state=unchecked]:bg-muted-foreground data-[state=unchecked]:translate-x-0",
        size === "sm"
          ? "h-3 w-3 data-[state=checked]:translate-x-[10px]"
          : "h-3.5 w-3.5 data-[state=checked]:translate-x-3",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
