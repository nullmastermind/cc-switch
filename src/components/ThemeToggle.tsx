import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light" as const, icon: Sun, labelKey: "settings.themeLight" },
  { value: "dark" as const, icon: Moon, labelKey: "settings.themeDark" },
  { value: "system" as const, icon: Monitor, labelKey: "settings.themeSystem" },
];

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="inline-flex h-8 shrink-0 items-center rounded-lg bg-muted/50"
      style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      role="group"
      aria-label={t("settings.theme")}
    >
      {OPTIONS.map(({ value, icon: Icon, labelKey }) => {
        const active = theme === value;
        return (
          <Button
            key={value}
            type="button"
            size="icon"
            variant="ghost"
            aria-label={t(labelKey)}
            aria-pressed={active}
            title={t(labelKey)}
            onClick={() => setTheme(value)}
            className={cn(
              "h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-transparent",
              active && "bg-background text-foreground shadow-sm",
            )}
          >
            <Icon className="h-4 w-4" />
          </Button>
        );
      })}
    </div>
  );
}
