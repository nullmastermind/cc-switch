import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Shared look for Input / Select trigger / Textarea (upstream exports this; the
 * fork renders it in the comfortable 13px / 6px-radius style).
 */
export const fieldClass =
  "w-full rounded-control border border-border-default bg-transparent px-2.5 text-body text-foreground transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-blue-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/20 aria-[invalid=true]:border-red-500 disabled:cursor-not-allowed disabled:opacity-50";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          fieldClass,
          "flex h-8 py-1.5 file:border-0 file:bg-transparent file:text-body file:font-medium file:text-foreground",
          className,
        )}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
