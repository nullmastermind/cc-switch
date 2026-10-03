import { cn } from "@/lib/utils";

export type ProviderStatusBadgeTone =
  | "info"
  | "muted"
  | "success"
  | "warning"
  | "stack";

export interface ProviderStatusBadgeData {
  label: string;
  tone?: ProviderStatusBadgeTone;
  title?: string;
}

interface ProviderStatusBadgeProps extends ProviderStatusBadgeData {
  className?: string;
}

const toneClasses: Record<ProviderStatusBadgeTone, string> = {
  info: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  muted: "bg-slate-200 text-slate-700 dark:bg-slate-700/60 dark:text-slate-200",
  success:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  warning:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  stack:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
};

export function ProviderStatusBadge({
  label,
  tone = "muted",
  title,
  className,
}: ProviderStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[12.35px] leading-[1.3] font-semibold",
        toneClasses[tone],
        title &&
          "cursor-help outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        className,
      )}
      tabIndex={title ? 0 : undefined}
      title={title}
    >
      {label}
    </span>
  );
}
