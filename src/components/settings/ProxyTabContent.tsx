import { useState } from "react";
import { Server, Activity, Zap, Globe, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProxyPanel } from "@/components/proxy";
import { AutoFailoverConfigPanel } from "@/components/proxy/AutoFailoverConfigPanel";
import { FailoverQueueManager } from "@/components/proxy/FailoverQueueManager";
import { RectifierConfigPanel } from "@/components/settings/RectifierConfigPanel";
import { GlobalProxySettings } from "@/components/settings/GlobalProxySettings";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { ToggleRow } from "@/components/ui/toggle-row";
import { useProxyStatus } from "@/hooks/useProxyStatus";
import type { SettingsFormState } from "@/hooks/useSettings";
import { useProxyStack } from "@/lib/query/proxy";
import {
  getAppLabel,
  isStackAppId,
  PROXY_APP_IDS,
  type ProxyAppId,
} from "@/config/appConfig";

interface ProxyTabContentProps {
  settings: SettingsFormState;
  onAutoSave: (updates: Partial<SettingsFormState>) => Promise<boolean | void>;
}

export const FAILOVER_APPS = PROXY_APP_IDS.map((id) => ({
  id,
  label: getAppLabel(id),
}));

export function ProxyTabContent({
  settings,
  onAutoSave,
}: ProxyTabContentProps) {
  const { t } = useTranslation();
  const [showProxyConfirm, setShowProxyConfirm] = useState(false);
  const [showFailoverConfirm, setShowFailoverConfirm] = useState(false);

  const {
    isRunning,
    takeoverStatus,
    startProxyServer,
    stopWithRestore,
    exitAppsInMode,
    isPending: isProxyPending,
  } = useProxyStatus();

  // 主页面的路由开关和 Stack 模式开关二选一。打开一个之前，处于另一种模式的 Claude Code、
  // Codex 先退回直连（`stack` 为真是 Stack 模式开关）。
  const handleMainPageSwitchChange = async (
    stack: boolean,
    checked: boolean,
  ) => {
    if (checked) {
      try {
        await exitAppsInMode(!stack);
      } catch (error) {
        console.error("Exit apps in the other mode failed:", error);
        return;
      }
    }
    await onAutoSave(
      stack
        ? {
            enableStackMode: checked,
            ...(checked && { enableLocalProxy: false }),
          }
        : {
            enableLocalProxy: checked,
            ...(checked && { enableStackMode: false }),
          },
    );
  };

  const handleToggleProxy = async (checked: boolean) => {
    try {
      if (!checked) {
        await stopWithRestore();
      } else if (!settings?.proxyConfirmed) {
        setShowProxyConfirm(true);
      } else {
        await startProxyServer();
      }
    } catch (error) {
      console.error("Toggle proxy failed:", error);
    }
  };

  const handleProxyConfirm = async () => {
    setShowProxyConfirm(false);
    try {
      await onAutoSave({ proxyConfirmed: true });
      await startProxyServer();
    } catch (error) {
      console.error("Proxy confirm failed:", error);
    }
  };

  const handleFailoverToggleChange = (checked: boolean) => {
    if (checked && !settings?.failoverConfirmed) {
      setShowFailoverConfirm(true);
    } else {
      void onAutoSave({ enableFailoverToggle: checked });
    }
  };

  const handleFailoverConfirm = async () => {
    setShowFailoverConfirm(false);
    try {
      await onAutoSave({ failoverConfirmed: true, enableFailoverToggle: true });
    } catch (error) {
      console.error("Failover confirm failed:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <Accordion type="multiple" defaultValue={[]} className="w-full space-y-2">
        {/* Local Proxy */}
        <AccordionItem
          value="proxy"
          className="rounded-[8px] glass-card overflow-hidden"
        >
          <AccordionTrigger className="px-2 py-2 hover:no-underline hover:bg-muted/50 data-[state=open]:bg-muted/50">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-green-500" />
              <div className="text-left">
                <h3 className="text-ui font-semibold">
                  {t("settings.advanced.proxy.title")}
                </h3>
                <p className="text-ui text-muted-foreground font-normal">
                  {t("settings.advanced.proxy.description")}
                </p>
              </div>
              <Badge
                variant={isRunning ? "default" : "secondary"}
                className="gap-1.5 h-6 ml-auto mr-2"
              >
                <Activity
                  className={`h-3 w-3 ${isRunning ? "status-heartbeat" : ""}`}
                />
                {isRunning
                  ? t("settings.advanced.proxy.running")
                  : t("settings.advanced.proxy.stopped")}
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-2 pt-2 border-t border-border/50">
            <ProxyPanel
              enableLocalProxy={settings?.enableLocalProxy ?? true}
              onEnableLocalProxyChange={(checked) =>
                void handleMainPageSwitchChange(false, checked)
              }
              enableStackMode={settings?.enableStackMode ?? false}
              onEnableStackModeChange={(checked) =>
                void handleMainPageSwitchChange(true, checked)
              }
              onToggleProxy={handleToggleProxy}
              isProxyPending={isProxyPending}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Auto Failover */}
        <AccordionItem
          value="failover"
          className="rounded-[8px] glass-card overflow-hidden"
        >
          <AccordionTrigger className="px-2 py-2 hover:no-underline hover:bg-muted/50 data-[state=open]:bg-muted/50">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-orange-500" />
              <div className="text-left">
                <h3 className="text-ui font-semibold">
                  {t("settings.advanced.failover.title")}
                </h3>
                <p className="text-ui text-muted-foreground font-normal">
                  {t("settings.advanced.failover.description")}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-2 pt-2 border-t border-border/50">
            <div className="space-y-2">
              <ToggleRow
                icon={<ShieldAlert className="h-4 w-4 text-orange-500" />}
                title={t("settings.advanced.proxy.enableFailoverToggle")}
                description={t(
                  "settings.advanced.proxy.enableFailoverToggleDescription",
                )}
                checked={settings?.enableFailoverToggle ?? true}
                onCheckedChange={handleFailoverToggleChange}
              />

              {!isRunning && (
                <div className="p-2 rounded-[8px] bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-ui text-yellow-600 dark:text-yellow-400">
                    {t("proxy.failover.proxyRequired", {
                      defaultValue: "需要先启动代理服务才能配置故障转移",
                    })}
                  </p>
                </div>
              )}

              <Tabs defaultValue="claude" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {FAILOVER_APPS.map(({ id, label }) => (
                    <TabsTrigger key={id} value={id}>
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {FAILOVER_APPS.map(({ id: appType }) => (
                  <TabsContent
                    key={appType}
                    value={appType}
                    className="mt-4 space-y-6"
                  >
                    <FailoverAppSettings
                      appType={appType}
                      routed={isRunning && (takeoverStatus?.[appType] ?? false)}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rectifier */}
        <AccordionItem
          value="rectifier"
          className="rounded-[8px] glass-card overflow-hidden"
        >
          <AccordionTrigger className="px-2 py-2 hover:no-underline hover:bg-muted/50 data-[state=open]:bg-muted/50">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-500" />
              <div className="text-left">
                <h3 className="text-ui font-semibold">
                  {t("settings.advanced.rectifier.title")}
                </h3>
                <p className="text-ui text-muted-foreground font-normal">
                  {t("settings.advanced.rectifier.description")}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-2 pt-2 border-t border-border/50">
            <RectifierConfigPanel />
          </AccordionContent>
        </AccordionItem>

        {/* Global Outbound Proxy */}
        <AccordionItem
          value="globalProxy"
          className="rounded-[8px] glass-card overflow-hidden"
        >
          <AccordionTrigger className="px-2 py-2 hover:no-underline hover:bg-muted/50 data-[state=open]:bg-muted/50">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-cyan-500" />
              <div className="text-left">
                <h3 className="text-ui font-semibold">
                  {t("settings.advanced.globalProxy.title")}
                </h3>
                <p className="text-ui text-muted-foreground font-normal">
                  {t("settings.advanced.globalProxy.description")}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-2 pt-2 border-t border-border/50">
            <GlobalProxySettings />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ConfirmDialog
        isOpen={showProxyConfirm}
        variant="info"
        title={t("confirm.proxy.title")}
        message={t("confirm.proxy.message")}
        confirmText={t("confirm.proxy.confirm")}
        onConfirm={() => void handleProxyConfirm()}
        onCancel={() => setShowProxyConfirm(false)}
      />

      <ConfirmDialog
        isOpen={showFailoverConfirm}
        variant="info"
        title={t("confirm.failover.title")}
        message={t("confirm.failover.message")}
        confirmText={t("confirm.failover.confirm")}
        onConfirm={() => void handleFailoverConfirm()}
        onCancel={() => setShowFailoverConfirm(false)}
      />
    </motion.div>
  );
}

// 一个应用的故障转移队列和参数：路由服务在跑且接管了这个应用时才能改。Stack 模式不做故障
// 转移（Claude Code、Codex），这时也不能改；队列和设置留着，回到路由模式恢复。
function FailoverAppSettings({
  appType,
  routed,
}: {
  appType: ProxyAppId;
  routed: boolean;
}) {
  const { t } = useTranslation();
  const { data: stack } = useProxyStack(
    appType,
    routed && isStackAppId(appType),
  );
  const stackMode = routed && stack?.active === true;
  const disabled = !routed || stackMode;

  return (
    <>
      {stackMode && (
        <div className="rounded-[8px] border border-yellow-500/20 bg-yellow-500/10 p-2">
          <p className="text-[12.35px] leading-[1.3] text-yellow-600 dark:text-yellow-400">
            {t("proxy.stackMode.failoverUnavailable", {
              appLabel: getAppLabel(appType),
            })}
          </p>
        </div>
      )}
      <div className="space-y-2">
        <div>
          <h4 className="text-[12.35px] font-semibold leading-[1.3]">
            {t("proxy.failoverQueue.title")}
          </h4>
          <p className="text-[12.35px] leading-[1.3] text-muted-foreground">
            {t("proxy.failoverQueue.description")}
          </p>
        </div>
        <FailoverQueueManager appType={appType} disabled={disabled} />
      </div>
      <div className="border-t border-border/50 pt-2">
        <AutoFailoverConfigPanel appType={appType} disabled={disabled} />
      </div>
    </>
  );
}
