import { useTranslation } from "react-i18next";
import { DeepLinkImportRequest } from "../../lib/api/deeplink";

export function SkillConfirmation({
  request,
}: {
  request: DeepLinkImportRequest;
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-strong font-semibold">{t("deeplink.skill.title")}</h3>

      <div>
        <label className="block text-body font-medium text-fg-2">
          {t("deeplink.skill.repo")}
        </label>
        <div className="mt-1.5 rounded-control border bg-subtle px-3 py-2 font-mono text-body">
          {request.repo}
        </div>
      </div>

      <div>
        <label className="block text-body font-medium text-fg-2">
          {t("deeplink.skill.directory")}
        </label>
        <div className="mt-1.5 rounded-control border bg-subtle px-3 py-2 font-mono text-body">
          {request.directory}
        </div>
      </div>

      <div>
        <label className="block text-body font-medium text-fg-2">
          {t("deeplink.skill.branch")}
        </label>
        <div className="mt-1.5 text-body">{request.branch || "main"}</div>
      </div>

      <div className="rounded-panel border border-border-strong bg-subtle px-4 py-3 text-body text-fg-1">
        <p>ℹ️ {t("deeplink.skill.hint")}</p>
        <p className="mt-1">{t("deeplink.skill.hintDetail")}</p>
      </div>
    </div>
  );
}
