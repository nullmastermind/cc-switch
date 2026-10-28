import { Switch } from "@/components/ui/switch";

export interface ToggleRowProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  disabled?: boolean;
}

export function ToggleRow({
  icon,
  title,
  description,
  checked,
  onCheckedChange,
  disabled,
}: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-muted/50">
      <div className="flex min-w-0 items-center gap-3">
        {icon}
        <div className="min-w-0 space-y-0.5">
          <p className="text-body font-medium">{title}</p>
          {description ? (
            <p className="text-caption text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-label={title}
      />
    </div>
  );
}
