import { useTranslation } from "react-i18next";
import { Edit2, Trash2, RefreshCw, Globe, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverTip } from "@/components/ui/hover-tip";
import { ProviderIcon } from "@/components/ProviderIcon";
import type { UniversalProvider } from "@/types";

interface UniversalProviderCardProps {
  provider: UniversalProvider;
  onEdit: (provider: UniversalProvider) => void;
  onDelete: (id: string) => void;
  onSync: (id: string) => void;
  onDuplicate: (provider: UniversalProvider) => void;
}

export function UniversalProviderCard({
  provider,
  onEdit,
  onDelete,
  onSync,
  onDuplicate,
}: UniversalProviderCardProps) {
  const { t } = useTranslation();

  // 获取启用的应用列表
  const enabledApps: string[] = [
    provider.apps.claude ? "Claude" : null,
    provider.apps.codex ? "Codex" : null,
    provider.apps.gemini ? "Gemini" : null,
  ].filter((app): app is string => app !== null);

  return (
    <div className="group relative rounded-panel border border-border/50 bg-card p-4 transition-all hover:border-border hover:shadow-md">
      {/* 头部：图标和名称 */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-accent">
            <ProviderIcon icon={provider.icon} name={provider.name} size={16} />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-strong font-semibold text-foreground">
              {provider.name}
            </h3>
            <p className="truncate text-caption text-muted-foreground">
              {provider.providerType}
            </p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex shrink-0 items-center gap-1 opacity-30 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <HoverTip
            content={t("universalProvider.sync", {
              defaultValue: "同步到应用",
            })}
          >
            <Button
              variant="ghost"
              size="icon-compact"
              onClick={() => onSync(provider.id)}
              aria-label={t("universalProvider.sync", {
                defaultValue: "同步到应用",
              })}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </HoverTip>
          <HoverTip
            content={t("universalProvider.duplicate", { defaultValue: "复制" })}
          >
            <Button
              variant="ghost"
              size="icon-compact"
              onClick={() => onDuplicate(provider)}
              aria-label={t("universalProvider.duplicate", {
                defaultValue: "复制",
              })}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </HoverTip>
          <HoverTip content={t("common.edit", { defaultValue: "编辑" })}>
            <Button
              variant="ghost"
              size="icon-compact"
              onClick={() => onEdit(provider)}
              aria-label={t("common.edit", { defaultValue: "编辑" })}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </HoverTip>
          <HoverTip content={t("common.delete", { defaultValue: "删除" })}>
            <Button
              variant="ghost"
              size="icon-compact"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(provider.id)}
              aria-label={t("common.delete", { defaultValue: "删除" })}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </HoverTip>
        </div>
      </div>

      {/* 配置信息 */}
      <div className="mt-3 space-y-2">
        {/* Base URL */}
        <div className="flex min-w-0 items-center gap-2 text-body">
          <Globe className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate text-muted-foreground">
            {provider.baseUrl || "-"}
          </span>
        </div>

        {/* 启用的应用 */}
        <div className="flex flex-wrap gap-1.5">
          {enabledApps.map((app) => (
            <span
              key={app}
              className="inline-flex h-5 items-center rounded-full bg-primary/10 px-2 text-badge font-medium text-primary"
            >
              {app}
            </span>
          ))}
          {enabledApps.length === 0 && (
            <span className="text-caption text-muted-foreground">
              {t("universalProvider.noAppsEnabled", {
                defaultValue: "未启用任何应用",
              })}
            </span>
          )}
        </div>
      </div>

      {/* 备注 */}
      {provider.notes && (
        <p className="mt-3 text-caption text-muted-foreground line-clamp-2">
          {provider.notes}
        </p>
      )}
    </div>
  );
}
