import { memo } from "react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ProviderIcon } from "@/components/ProviderIcon";
import type { SessionMeta } from "@/types";
import {
  formatRelativeTime,
  formatSessionTitle,
  getProviderIconName,
  getProviderLabel,
  getSessionKey,
  highlightText,
} from "./utils";

interface SessionItemProps {
  session: SessionMeta;
  isSelected: boolean;
  selectionMode: boolean;
  isChecked: boolean;
  isCheckDisabled?: boolean;
  searchQuery?: string;
  onSelect: (key: string) => void;
  onToggleChecked: (key: string, checked: boolean) => void;
}

export const SessionItem = memo(function SessionItem({
  session,
  isSelected,
  selectionMode,
  isChecked,
  isCheckDisabled = false,
  searchQuery,
  onSelect,
  onToggleChecked,
}: SessionItemProps) {
  const { t } = useTranslation();
  const title = formatSessionTitle(session);
  const lastActive = session.lastActiveAt || session.createdAt || undefined;
  const sessionKey = getSessionKey(session);

  return (
    <div
      className={cn(
        "relative flex h-6 min-w-0 items-center gap-1 px-2 duration-0",
        isSelected ? "bg-muted" : "hover:bg-muted/40",
      )}
    >
      {isSelected && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 bg-primary"
        />
      )}
      {selectionMode && (
        <Checkbox
          checked={isChecked}
          disabled={isCheckDisabled}
          aria-label={t("sessionManager.selectForBatch", {
            defaultValue: "选择会话",
          })}
          onCheckedChange={(checked) =>
            onToggleChecked(sessionKey, Boolean(checked))
          }
        />
      )}
      <button
        type="button"
        onClick={() => onSelect(sessionKey)}
        className="flex h-6 min-w-0 flex-1 items-center gap-1 overflow-hidden text-left text-[12.35px] leading-[1.3] text-foreground duration-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <span
          className="flex size-4 shrink-0 items-center justify-center leading-none"
          title={getProviderLabel(session.providerId, t)}
        >
          <ProviderIcon
            icon={getProviderIconName(session.providerId)}
            name={session.providerId}
            size={16}
          />
        </span>

        <span title={title} className="min-w-0 flex-1 truncate">
          {searchQuery ? highlightText(title, searchQuery) : title}
        </span>

        <span className="shrink-0 text-muted-foreground">
          {lastActive ? formatRelativeTime(lastActive, t) : t("common.unknown")}
        </span>

        <ChevronRight className="size-4 shrink-0 text-muted-foreground/50" />
      </button>
    </div>
  );
});
