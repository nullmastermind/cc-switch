import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ToolInstallationReport } from "@/lib/api/settings";
import { ToolInstallRow } from "./ToolInstallRow";

interface ToolUpgradeConfirmDialogProps {
  isOpen: boolean;
  plans: ToolInstallationReport[];
  displayName: (tool: string) => string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * 升级前的「多处安装确认」。仅当某工具检测到 ≥2 处安装时弹出：展示命令行实际命中
 * 哪处（标「默认」= 升级目标）、各处版本，以及锚定后将执行的命令，让用户在
 * 「升级只动其中一处、其余不动」这件事上知情后再确认。单处安装不会走到这里。
 */
export function ToolUpgradeConfirmDialog({
  isOpen,
  plans,
  displayName,
  onConfirm,
  onCancel,
}: ToolUpgradeConfirmDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <DialogContent
        className="w-full max-w-[480px] gap-2 rounded-[8px] p-2 text-ui sm:rounded-[8px]"
        zIndex="alert"
      >
        <DialogHeader className="space-y-2 border-b-0 bg-transparent p-0">
          <DialogTitle className="flex items-center gap-2 text-[12.35px] font-semibold leading-[1.3] tracking-normal">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            {t("settings.toolUpgradeConfirmTitle")}
          </DialogTitle>
          <DialogDescription className="text-[12.35px] leading-[1.3]">
            {t("settings.toolUpgradeConfirmHint")}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[50vh] space-y-2 overflow-y-auto">
          {plans.map((plan) => (
            <div
              key={plan.tool}
              className="space-y-2 rounded-[8px] border border-yellow-500/20 bg-yellow-500/5 p-2"
            >
              <div className="text-ui font-medium">
                {displayName(plan.tool)}
              </div>
              {!plan.anchored && (
                <div className="text-ui leading-[1.3] text-yellow-600 dark:text-yellow-400">
                  {t("settings.toolUpgradeUnanchoredHint")}
                </div>
              )}
              <ul className="space-y-1">
                {plan.installs.map((inst) => (
                  <li key={inst.path}>
                    <ToolInstallRow inst={inst} />
                  </li>
                ))}
              </ul>
              <div className="space-y-1">
                <div className="text-ui text-muted-foreground">
                  {t("settings.toolUpgradeWillRun")}
                </div>
                <code
                  className="block min-h-6 truncate rounded-[4px] bg-background/80 px-2 py-1 font-mono text-ui text-foreground"
                  title={plan.command}
                >
                  {plan.command}
                </code>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2 border-t-0 bg-transparent p-0 sm:justify-end">
          <Button variant="outline" onClick={onCancel}>
            {t("common.cancel")}
          </Button>
          <Button onClick={onConfirm}>
            {t("settings.toolUpgradeConfirmBtn")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
