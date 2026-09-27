import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Download, Trash2, Loader2, Replace } from "lucide-react";
import { settingsApi } from "@/lib/api";
import type { DiscoverableSkill } from "@/lib/api/skills";

type SkillCardSkill = DiscoverableSkill & { installed: boolean };

interface SkillCardProps {
  skill: SkillCardSkill;
  onInstall: (key: string) => Promise<void>;
  onUninstall: (key: string) => Promise<void>;
  onReplace?: (key: string) => Promise<void>;
  occupied?: boolean;
  installs?: number;
}

export function SkillCard({
  skill,
  onInstall,
  onUninstall,
  onReplace,
  occupied = false,
  installs,
}: SkillCardProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const run = async (fn: () => Promise<void>) => {
    setLoading(true);
    try {
      await fn();
    } finally {
      setLoading(false);
    }
  };

  const handleInstall = () => run(() => onInstall(skill.key));
  const handleUninstall = () => run(() => onUninstall(skill.key));
  const handleReplace = () =>
    run(() => onReplace?.(skill.key) ?? Promise.resolve());

  const handleOpenGithub = async () => {
    if (skill.readmeUrl) {
      try {
        await settingsApi.openExternal(skill.readmeUrl);
      } catch (error) {
        console.error("Failed to open URL:", error);
      }
    }
  };

  const showDirectory =
    Boolean(skill.directory) &&
    skill.directory.trim().toLowerCase() !== skill.name.trim().toLowerCase();

  return (
    <Card className="skill-card relative flex h-full flex-col overflow-hidden">
      <CardHeader className="space-y-0 p-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="skill-card-title truncate">
              {skill.name}
            </CardTitle>
            <div className="mt-1.5 flex items-center gap-2">
              {showDirectory && (
                <CardDescription className="skill-card-desc truncate">
                  {skill.directory}
                </CardDescription>
              )}
              {skill.repoOwner && skill.repoName && (
                <Badge variant="secondary" className="skill-card-tag shrink-0">
                  {skill.repoOwner}/{skill.repoName}
                </Badge>
              )}
              {typeof installs === "number" && (
                <Badge
                  variant="secondary"
                  className="skill-card-counter shrink-0"
                >
                  <Download className="h-3 w-3" />
                  {installs.toLocaleString()}
                </Badge>
              )}
            </div>
          </div>
          {skill.installed && (
            <Badge className="skill-card-status shrink-0">
              {t("skills.installed")}
            </Badge>
          )}
        </div>
      </CardHeader>
      {skill.description ? (
        <CardContent className="flex-1 px-3 py-0">
          <p className="skill-card-desc line-clamp-4">{skill.description}</p>
        </CardContent>
      ) : (
        <div className="flex-1" />
      )}
      <CardFooter className="skill-card-footer relative z-10 flex gap-2 p-3 pt-2">
        {skill.readmeUrl && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleOpenGithub}
            disabled={loading}
            className="skill-card-ghost flex-1"
          >
            <ExternalLink className="h-3 w-3" />
            {t("skills.view")}
          </Button>
        )}
        {skill.installed ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleUninstall}
            disabled={loading}
            className="flex-1"
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Trash2 className="h-3 w-3" />
            )}
            {loading ? t("skills.uninstalling") : t("skills.uninstall")}
          </Button>
        ) : occupied && onReplace ? (
          <Button
            variant="warning"
            size="sm"
            onClick={handleReplace}
            disabled={loading || !skill.repoOwner}
            className="flex-1"
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Replace className="h-3 w-3" />
            )}
            {loading ? t("skills.replacing") : t("skills.replace")}
          </Button>
        ) : (
          <Button
            variant="positive"
            size="sm"
            onClick={handleInstall}
            disabled={loading || !skill.repoOwner}
            className="flex-1"
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Download className="h-3 w-3" />
            )}
            {loading ? t("skills.installing") : t("skills.install")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
