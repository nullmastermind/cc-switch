import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // 主按钮：蓝底白字（对应旧版 primary）
        default:
          "bg-accent text-white hover:bg-accent dark:bg-accent dark:hover:bg-accent",
        // 危险按钮：红底白字（对应旧版 danger）
        destructive:
          "bg-negative text-white hover:bg-negative dark:bg-negative dark:hover:bg-negative",
        // 轮廓按钮
        outline:
          "border border-border-default bg-background text-muted-foreground hover:bg-bg-subtle hover:text-text hover:border-border-hover dark:hover:bg-surface dark:hover:text-text",
        // 次按钮：灰色（对应旧版 secondary）
        secondary:
          "text-text-secondary hover:bg-bg-subtle dark:text-text-secondary dark:hover:bg-surface dark:hover:text-text",
        // 幽灵按钮（对应旧版 ghost）
        ghost:
          "text-text-secondary hover:text-text hover:bg-bg-subtle dark:text-text-secondary dark:hover:text-text dark:hover:bg-surface",
        // MCP 专属按钮：祖母绿
        mcp: "bg-positive text-white hover:bg-positive dark:bg-positive dark:hover:bg-positive",
        // 链接按钮
        link: "text-accent underline-offset-4 hover:underline dark:text-accent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9 p-1.5",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
