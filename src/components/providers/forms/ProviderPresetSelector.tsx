import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClaudeIcon, CodexIcon, GeminiIcon } from "@/components/BrandIcons";
import {
  ArrowUpAZ,
  ChevronDown,
  ChevronRight,
  Search,
  Zap,
  Star,
  Heart,
  Layers,
  Settings2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { ProviderPreset } from "@/config/claudeProviderPresets";
import type { CodexProviderPreset } from "@/config/codexProviderPresets";
import type { GeminiProviderPreset } from "@/config/geminiProviderPresets";
import type { ClaudeDesktopProviderPreset } from "@/config/claudeDesktopProviderPresets";
import type { OpenCodeProviderPreset } from "@/config/opencodeProviderPresets";
import type { OpenClawProviderPreset } from "@/config/openclawProviderPresets";
import type { HermesProviderPreset } from "@/config/hermesProviderPresets";
import type { McodeProviderPreset } from "@/config/mcodeProviderPresets";
import type { PiProviderPreset } from "@/config/piProviderPresets";
import type { ProviderCategory } from "@/types";
import {
  universalProviderPresets,
  type UniversalProviderPreset,
} from "@/config/universalProviderPresets";
import { ProviderIcon } from "@/components/ProviderIcon";

type PresetTranslator = (key: string) => unknown;

export const PresetSortMode = {
  Original: "original",
  NameAsc: "nameAsc",
} as const;

export type PresetSortMode =
  (typeof PresetSortMode)[keyof typeof PresetSortMode];

export type AnyPreset =
  | ProviderPreset
  | CodexProviderPreset
  | GeminiProviderPreset
  | ClaudeDesktopProviderPreset
  | OpenCodeProviderPreset
  | OpenClawProviderPreset
  | HermesProviderPreset
  | PiProviderPreset
  | McodeProviderPreset;

export type PresetEntry = {
  id: string;
  preset: AnyPreset;
};

export function getPresetDisplayName(
  preset: AnyPreset,
  t: PresetTranslator,
): string {
  return preset.nameKey ? String(t(preset.nameKey)) : preset.name;
}

export function getPresetSearchText(
  entry: PresetEntry,
  t: PresetTranslator,
): string {
  return [getPresetDisplayName(entry.preset, t), entry.preset.name]
    .join(" ")
    .toLowerCase();
}

export function filterPresetEntries(
  entries: PresetEntry[],
  query: string,
  t: PresetTranslator,
): PresetEntry[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return entries;
  }

  return entries.filter((entry) =>
    getPresetSearchText(entry, t).includes(normalizedQuery),
  );
}

export function sortPresetEntries(
  entries: PresetEntry[],
  sortMode: PresetSortMode,
  t: PresetTranslator,
): PresetEntry[] {
  const byDisplayName = (a: PresetEntry, b: PresetEntry) =>
    getPresetDisplayName(a.preset, t).localeCompare(
      getPresetDisplayName(b.preset, t),
    );

  if (sortMode === PresetSortMode.Original) {
    // 置顶优先级：官方分类/isOfficial > 尊享合作伙伴（Kimi）> 其余赞助商 > 非赞助商。
    // 前三组用分区拼接而非排序，保持各自在预设文件里的相对顺序
    // （赞助商的文件顺序与 README 赞助商表对齐）；非赞助商按显示名排序。
    // 排他条件保证同时命中多组的预设只归入最前面的组、不被重复。
    const isPinnedOfficial = (preset: AnyPreset) =>
      preset.category === "official" ||
      ("isOfficial" in preset && Boolean(preset.isOfficial));
    const official = entries.filter((entry) => isPinnedOfficial(entry.preset));
    const prime = entries.filter(
      (entry) =>
        !isPinnedOfficial(entry.preset) && entry.preset.primePartner,
    );
    const partner = entries.filter(
      (entry) =>
        !isPinnedOfficial(entry.preset) &&
        !entry.preset.primePartner &&
        entry.preset.isPartner,
    );
    const rest = entries
      .filter(
        (entry) =>
          !isPinnedOfficial(entry.preset) &&
          !entry.preset.primePartner &&
          !entry.preset.isPartner,
      )
      .sort(byDisplayName);
    return [...official, ...prime, ...partner, ...rest];
  }

  return [...entries].sort(byDisplayName);
}

export interface PresetVisibilityOptions {
  query: string;
  sortMode: PresetSortMode;
  t: PresetTranslator;
}

export function getVisiblePresetEntries(
  entries: PresetEntry[],
  options: PresetVisibilityOptions,
): PresetEntry[] {
  const { query, sortMode, t } = options;

  return sortPresetEntries(filterPresetEntries(entries, query, t), sortMode, t);
}

const OFFICIAL_COMPANY_CATEGORIES: ReadonlySet<ProviderCategory> = new Set([
  "official",
  "cn_official",
  "cloud_provider",
]);

const OFFICIAL_COMPANY_NAMES = new Set([
  "gemini native",
  "github copilot",
  "codex",
  "xai (grok)",
  "nvidia",
  "opencode go",
  "siliconflow",
  "siliconflow en",
  "modelscope",
  "openrouter",
]);

const PRESET_GRID_CLASS =
  "grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2";

export function isOfficialCompanyPreset(preset: AnyPreset): boolean {
  if ("isOfficial" in preset && preset.isOfficial) return true;
  if (preset.category && OFFICIAL_COMPANY_CATEGORIES.has(preset.category)) {
    return true;
  }
  return OFFICIAL_COMPANY_NAMES.has(preset.name.trim().toLowerCase());
}

export function partitionPresetEntries(entries: PresetEntry[]): {
  official: PresetEntry[];
  unofficial: PresetEntry[];
} {
  const official: PresetEntry[] = [];
  const unofficial: PresetEntry[] = [];
  for (const entry of entries) {
    if (isOfficialCompanyPreset(entry.preset)) {
      official.push(entry);
    } else {
      unofficial.push(entry);
    }
  }
  return { official, unofficial };
}

interface ProviderPresetSelectorProps {
  selectedPresetId: string | null;
  presetEntries: PresetEntry[];
  presetCategoryLabels: Record<string, string>;
  onPresetChange: (value: string) => void;
  onUniversalPresetSelect?: (preset: UniversalProviderPreset) => void;
  onManageUniversalProviders?: () => void;
  category?: ProviderCategory; // 当前选中的分类
  categoryHint?: ReactNode;
}

export function ProviderPresetSelector({
  selectedPresetId,
  presetEntries,
  presetCategoryLabels,
  onPresetChange,
  onUniversalPresetSelect,
  onManageUniversalProviders,
  category,
  categoryHint,
}: Readonly<ProviderPresetSelectorProps>) {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<PresetSortMode>(
    PresetSortMode.Original,
  );
  const [unofficialOpen, setUnofficialOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 点击搜索区域外时收起并清空,对齐旧 Popover 的「点击外部关闭」行为
  useEffect(() => {
    if (!searchOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // 键盘快捷键: Ctrl/Cmd+F 打开搜索并聚焦输入框。
  // 使用捕获阶段并阻止冒泡，避免背后 ProviderList 的同名快捷键被意外触发。
  // 首次打开靠 Input 的 autoFocus 聚焦；若搜索已打开（例如点击 preset 后焦点
  // 停在按钮上），setSearchOpen(true) 同值不会重渲染、autoFocus 不重触发，
  // 这里用 rAF 命令式地把焦点移回搜索框（不 select，避免吞掉随后输入的首字符）。
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
        event.preventDefault();
        event.stopPropagation();
        setSearchOpen(true);
        requestAnimationFrame(() => searchInputRef.current?.focus());
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown, true);
    return () => globalThis.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  const visiblePresetEntries = useMemo(
    () =>
      getVisiblePresetEntries(presetEntries, {
        query: searchQuery,
        sortMode,
        t,
      }),
    [presetEntries, searchQuery, sortMode, t],
  );

  const { official: officialEntries, unofficial: unofficialEntries } = useMemo(
    () => partitionPresetEntries(visiblePresetEntries),
    [visiblePresetEntries],
  );

  useEffect(() => {
    const selectedInUnofficial = unofficialEntries.some(
      (entry) => entry.id === selectedPresetId,
    );
    const searchingUnofficial =
      searchQuery.trim() !== "" && unofficialEntries.length > 0;
    if (selectedInUnofficial || searchingUnofficial) {
      setUnofficialOpen(true);
    } else if (!searchQuery.trim() && !selectedInUnofficial) {
      setUnofficialOpen(false);
    }
  }, [searchQuery, selectedPresetId, unofficialEntries]);

  const getCategoryHint = (): ReactNode => {
    if (categoryHint !== undefined) return categoryHint;
    switch (category) {
      case "official":
        return t("providerForm.officialHint", {
          defaultValue: "💡 官方供应商使用浏览器登录，无需配置 API Key",
        });
      case "cn_official":
        return t("providerForm.cnOfficialApiKeyHint", {
          defaultValue: "💡 国产官方供应商只需填写 API Key，请求地址已预设",
        });
      case "aggregator":
        return t("providerForm.aggregatorApiKeyHint", {
          defaultValue: "💡 聚合服务供应商只需填写 API Key 即可使用",
        });
      case "third_party":
        return t("providerForm.thirdPartyApiKeyHint", {
          defaultValue: "💡 第三方供应商需要填写 API Key 和请求地址",
        });
      case "custom":
        return t("providerForm.customApiKeyHint", {
          defaultValue: "💡 自定义配置需手动填写所有必要字段",
        });
      case "omo":
        return t("providerForm.omoHint", {
          defaultValue:
            "💡 OMO 配置管理 Agent 模型分配，兼容 oh-my-openagent.jsonc / oh-my-opencode.jsonc",
        });
      default:
        return t("providerPreset.hint", {
          defaultValue: "选择预设后可继续调整下方字段。",
        });
    }
  };

  const toggleSortMode = () => {
    setSortMode((current) =>
      current === PresetSortMode.Original
        ? PresetSortMode.NameAsc
        : PresetSortMode.Original,
    );
  };

  const renderPresetIcon = (preset: AnyPreset, isSelected: boolean) => {
    if (preset.icon) {
      return (
        <ProviderIcon
          icon={preset.icon}
          name={preset.name}
          color={preset.iconColor}
          size={16}
          // currentColor 单色图标：未选中时取前景色，而非继承按钮的 muted 文字色，
          // 与表单图标预览、主面板卡片保持同色；选中态继续继承 text-white
          className={
            isSelected ? "flex-shrink-0" : "flex-shrink-0 text-foreground"
          }
        />
      );
    }

    const iconType = preset.theme?.icon;
    if (iconType) {
      switch (iconType) {
        case "claude":
          return <ClaudeIcon size={16} />;
        case "codex":
          return <CodexIcon size={16} />;
        case "gemini":
          return <GeminiIcon size={16} />;
        case "generic":
          return <Zap size={16} />;
      }
    }

    return <span className="inline-block w-4 h-4 flex-shrink-0" aria-hidden />;
  };

  const getPresetButtonStyle = (isSelected: boolean, preset: AnyPreset) => {
    if (!isSelected || !preset.theme?.backgroundColor) {
      return undefined;
    }

    return {
      backgroundColor: preset.theme.backgroundColor,
      color: preset.theme.textColor || "#FFFFFF",
    };
  };

  const renderPresetButton = (entry: PresetEntry) => {
    const isSelected = selectedPresetId === entry.id;
    const isPartner = entry.preset.isPartner;
    const isPrimePartner = entry.preset.primePartner;
    const presetCategory = entry.preset.category ?? "others";
    return (
      <Button
        key={entry.id}
        type="button"
        variant={isSelected ? "default" : "secondary"}
        onClick={() => onPresetChange(entry.id)}
        className="w-full min-w-0 justify-start overflow-hidden whitespace-normal text-left"
        style={getPresetButtonStyle(isSelected, entry.preset)}
        title={
          presetCategoryLabels[presetCategory] ?? t("providerPreset.other")
        }
      >
        {renderPresetIcon(entry.preset, isSelected)}
        <span className="min-w-0 truncate">
          {getPresetDisplayName(entry.preset, t)}
        </span>
        {isPrimePartner ? (
          <Heart
            className="ml-auto h-3 w-3 shrink-0 fill-amber-500 text-amber-500"
            strokeWidth={0}
            aria-hidden
          />
        ) : (
          isPartner && (
            <Star
              className="ml-auto h-3 w-3 shrink-0 fill-amber-500 text-amber-500"
              aria-hidden
            />
          )
        )}
      </Button>
    );
  };

  return (
    <div ref={searchContainerRef} className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label>{t("providerPreset.label")}</Label>
        <div className="flex items-center gap-2">
          {searchOpen && (
            <Input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchQuery("");
                  setSearchOpen(false);
                }
              }}
              placeholder={t("providerPreset.searchPlaceholder", {
                defaultValue: "Search presets...",
              })}
              aria-label={t("providerPreset.searchAriaLabel", {
                defaultValue: "Search provider presets",
              })}
              className="w-60 h-6"
              autoFocus
            />
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t("providerPreset.searchAriaLabel", {
              defaultValue: "Search provider presets",
            })}
            aria-pressed={searchOpen}
            onClick={() => {
              setSearchOpen((v) => !v);
              if (searchOpen) setSearchQuery("");
            }}
            title={t("providerPreset.searchTooltip", {
              defaultValue: "Search presets",
            })}
            className={
              searchOpen || searchQuery.trim()
                ? "bg-accent text-foreground"
                : undefined
            }
          >
            <Search className="size-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t("providerPreset.sortAriaLabel", {
              defaultValue: "Toggle preset sorting",
            })}
            aria-pressed={sortMode === PresetSortMode.NameAsc}
            onClick={toggleSortMode}
            title={
              sortMode === PresetSortMode.NameAsc
                ? t("providerPreset.sortOriginalTooltip", {
                    defaultValue: "Restore original order",
                  })
                : t("providerPreset.sortNameAscTooltip", {
                    defaultValue: "Sort A-Z",
                  })
            }
            className={
              sortMode === PresetSortMode.NameAsc
                ? "bg-accent text-foreground"
                : undefined
            }
          >
            <ArrowUpAZ className="size-4" />
          </Button>
        </div>
      </div>
      <div className={PRESET_GRID_CLASS}>
        <Button
          type="button"
          variant={selectedPresetId === "custom" ? "default" : "secondary"}
          onClick={() => onPresetChange("custom")}
          className="w-full min-w-0 justify-start overflow-hidden whitespace-normal text-left"
        >
          <span className="inline-block w-4 h-4 flex-shrink-0" aria-hidden />
          <span className="min-w-0 truncate">{t("providerPreset.custom")}</span>
        </Button>

        {visiblePresetEntries.length === 0 && (
          <div className="col-span-full rounded-[8px] border border-dashed border-border-default px-2 py-2 text-[12.35px] leading-[1.3] text-muted-foreground">
            {t("providerPreset.noSearchResults", {
              defaultValue: "No matching presets.",
            })}
          </div>
        )}

        {officialEntries.map(renderPresetButton)}
      </div>

      {unofficialEntries.length > 0 && (
        <Collapsible open={unofficialOpen} onOpenChange={setUnofficialOpen}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              aria-expanded={unofficialOpen}
              aria-label={t("providerPreset.unofficialAriaLabel", {
                defaultValue: "Toggle unofficial provider presets",
              })}
              className="flex h-6 w-full min-w-0 items-center justify-start gap-1.5 rounded-[4px] px-2 text-left text-[12.35px] font-medium leading-[1.3] text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {unofficialOpen ? (
                <ChevronDown className="h-3.5 w-3.5 shrink-0" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              )}
              <span className="min-w-0 truncate">
                {t("providerPreset.unofficial", {
                  defaultValue: "Unofficial",
                })}{" "}
                ({unofficialEntries.length})
              </span>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={`${PRESET_GRID_CLASS} pt-2`}>
              {unofficialEntries.map(renderPresetButton)}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {onUniversalPresetSelect && universalProviderPresets.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
          {universalProviderPresets.map((preset) => (
            <Button
              key={`universal-${preset.providerType}`}
              type="button"
              variant="secondary"
              onClick={() => onUniversalPresetSelect(preset)}
              className="w-full min-w-0 justify-start overflow-hidden whitespace-normal text-left"
              title={t("universalProvider.hint", {
                defaultValue: "跨应用统一配置，自动同步到 Claude/Codex/Gemini",
              })}
            >
              <ProviderIcon
                icon={preset.icon}
                name={preset.name}
                size={16}
                className="flex-shrink-0 text-foreground"
              />
              <span className="min-w-0 truncate">{preset.name}</span>
              <Layers className="ml-auto h-3 w-3 shrink-0 text-indigo-400" />
            </Button>
          ))}
          {onManageUniversalProviders && (
            <Button
              type="button"
              variant="secondary"
              onClick={onManageUniversalProviders}
              className="w-full min-w-0 justify-start overflow-hidden whitespace-normal text-left"
              title={t("universalProvider.manage", {
                defaultValue: "管理统一供应商",
              })}
            >
              <Settings2 className="h-4 w-4 flex-shrink-0" />
              <span className="min-w-0 truncate">
                {t("universalProvider.manage", {
                  defaultValue: "管理",
                })}
              </span>
            </Button>
          )}
        </div>
      )}

      <p className="text-[12.35px] leading-[1.3] text-muted-foreground">{getCategoryHint()}</p>
    </div>
  );
}
