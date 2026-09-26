import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProviderIcon } from "./ProviderIcon";
import { iconList } from "@/icons/extracted";
import { searchIcons, getIconMetadata } from "@/icons/extracted/metadata";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface IconPickerProps {
  value?: string; // 当前选中的图标
  onValueChange: (icon: string) => void; // 选择回调
  color?: string; // 预览颜色
}

export const IconPicker: React.FC<IconPickerProps> = ({
  value,
  onValueChange,
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

  // 过滤图标列表
  const filteredIcons = useMemo(() => {
    if (!searchQuery) return iconList;
    return searchIcons(searchQuery);
  }, [searchQuery]);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="icon-search">
          {t("iconPicker.search", { defaultValue: "搜索图标" })}
        </Label>
        <Input
          id="icon-search"
          type="text"
          placeholder={t("iconPicker.searchPlaceholder", {
            defaultValue: "输入图标名称...",
          })}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mt-2"
        />
      </div>

      <div className="max-h-[65vh] overflow-y-auto pr-1">
        <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-2">
          {filteredIcons.map((iconName) => {
            const meta = getIconMetadata(iconName);
            const isSelected = value === iconName;

            return (
              <Button
                key={iconName}
                type="button"
                variant="ghost"
                onClick={() => onValueChange(iconName)}
                className={cn(
                  "h-auto min-w-0 flex-col gap-1 p-3",
                  isSelected && "bg-primary/10",
                )}
                title={meta?.displayName || iconName}
              >
                <ProviderIcon icon={iconName} name={iconName} size={32} />
                <span className="w-full truncate text-center text-muted-foreground">
                  {meta?.displayName || iconName}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      {filteredIcons.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          {t("iconPicker.noResults", { defaultValue: "未找到匹配的图标" })}
        </div>
      )}
    </div>
  );
};
