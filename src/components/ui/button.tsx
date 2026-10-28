import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-[color,background-color,border-color,transform] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50 text-body",
  {
    variants: {
      variant: {
        default:
          "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
        secondary: "bg-muted text-foreground hover:bg-muted/80",
        outline:
          "border border-border-default bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-muted",
        destructive:
          "bg-[#D73251] text-white hover:bg-[#C72C49] active:bg-[#B82D46]",
        positive:
          "bg-[#14835E] text-white hover:bg-[#1E7857] active:bg-[#216F52]",
        warning:
          "bg-[#9F680C] text-white hover:bg-[#916012] active:bg-[#865A15]",
        link: "text-blue-500 underline-offset-4 hover:underline dark:text-blue-400",
        mcp: "bg-[#14835E] text-white hover:bg-[#1E7857] active:bg-[#216F52]",
        // v7 variants (upstream callers), rendered in the fork's compact look
        solid:
          "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
        neutral:
          "border border-border-strong bg-background text-foreground hover:bg-muted disabled:opacity-100 disabled:bg-transparent disabled:text-muted-foreground/60",
        quiet: "text-foreground hover:bg-muted",
        direct:
          "bg-direct-solid text-direct-on hover:brightness-110 active:brightness-95",
        route:
          "bg-route-solid text-route-on hover:brightness-110 active:brightness-95",
        stack:
          "bg-stack-solid text-stack-on hover:brightness-110 active:brightness-95",
      },
      size: {
        // Comfortable scale (docs/design-system.html): 32 page/toolbar,
        // 28 inside cards / dialogs / rows, 36 for prominent actions.
        default: "h-8 min-w-[64px] px-3.5 rounded-control",
        sm: "h-7 min-w-[56px] px-3 rounded-control",
        lg: "h-9 min-w-[72px] px-4 rounded-control",
        icon: "h-8 w-8 min-w-0 p-0 rounded-control",
        compact: "h-7 min-w-[56px] px-3 rounded-control",
        regular: "h-8 min-w-[64px] px-3.5 rounded-control",
        "icon-compact":
          "h-7 w-7 min-w-0 p-0 rounded-control text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
